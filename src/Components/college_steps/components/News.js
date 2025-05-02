import React, { memo, useEffect, useState } from 'react'
import InputFieldText from '../../../utils/CommonComponents/InputFieldText'
import TextArea from '../../../utils/CommonComponents/TextArea'
import { useDispatch, useSelector } from 'react-redux'
import { updateCollegeInfo } from '../../../features/newCollegeSlice'
import CustomButton from '../../../utils/CommonComponents/CustomButton'
import { v4 as uuid } from 'uuid'
import { constants } from '../../../utils/constants'
import ItemList from '../../ItemList'

const News = ({ collegeId, admin }) => {
    const [newsData, setNewsData] = useState(
        {
            news_id: '',
            title: '',
            content: "",
        }
    )
    const [isDisabled, setIsDisabled] = useState(true)
    const { news, isEdit } = useSelector((state) => state.newCollege)
    const dispatch = useDispatch()

    const createNewsList = () => {
        const newsId = uuid()
        const newsDataWithId = { ...newsData, news_id: newsId }
        const data = [...news?.news_data, newsDataWithId]
        dispatch(updateCollegeInfo({ classKey: 'news', key: 'news_data', value: data }))
        setNewsData(
            {
                news_id: '',
                title: '',
                content: "",
            }
        )
    }

    const handleFormData = () => {
        if (collegeId) {
            return
        } else {
            let formData = {}
            if (localStorage.getItem('formData')) {
                formData = JSON.parse(localStorage.getItem('formData'))
            }
            localStorage.setItem('formData', JSON.stringify({ ...formData, news: news?.news_data }))
        }
    }

    const addNewColumns = [
        {
            label: 'Delete',
            handleDeleteItem: (rowData) => {
                deleteNews(rowData)
            },
            classname: 'deleteButton'
        }
    ]

    const deleteNews = (rowData) => {
        const filteredData = news?.news_data.filter((data) => data.news_id !== rowData.news_id)
        dispatch(updateCollegeInfo({ classKey: 'news', key: 'news_data', value: filteredData }))
    }

    useEffect(() => {
        if (newsData?.title !== '' && newsData?.content !== '') {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }, [newsData?.title, newsData?.content])

    useEffect(() => {
        if (news.news_data.length > 0) {
            dispatch(updateCollegeInfo({ classKey: 'news', key: 'isValitadeError', value: false }))
            handleFormData()
        } else {
            dispatch(updateCollegeInfo({ classKey: 'news', key: 'isValitadeError', value: true }))
            handleFormData()
        }
    }, [news.news_data.length])
    return (
        <>
            <div style={collegeId && !isEdit ? { display: 'none' } : { gap: '20px', display: 'flex', margin: '2.5rem 0px', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' }}>
                <InputFieldText
                    placeholder='Title'
                    inputValue={newsData?.title}
                    inputType='text'
                    onChange={(e) => setNewsData({ ...newsData, title: e.target.value })}
                    styles={{ width: '300px' }}
                    disabled={collegeId && !isEdit ? true : false}
                />
                <TextArea
                    placeholder={'Content'}
                    noOfROws={6}
                    noOfCols={55}
                    fieldName={'Content'}
                    styles={{ border: 'solid #e83e8c 1px', borderRadius: '1rem' }}
                    onChange={(e) => setNewsData({ ...newsData, content: e.target.value })}
                    inputValue={newsData.content}
                    disabled={collegeId && !isEdit ? true : false}
                />
                <CustomButton
                    isDisabled={isDisabled}
                    lable={'Add News'}
                    onClick={() => createNewsList()}
                    styles={{ margin: '0px 30px', padding: '0px 20px', width: '300px', height: '40px' }}
                />
            </div>
            {news?.news_data.length > 0 && (
                <div>
                    <ItemList
                        userColumns={constants.newsUserColumns}
                        categoryData={news?.news_data.map((data) => { return { ...data, id: data.news_id } })}
                        addNewColumns={(collegeId && !isEdit) ? [] : addNewColumns}
                        labe={'News Listing'}
                        id={'news_id'}
                        isVewdetails={false}
                    />
                </div>
            )}
        </>
    )
}

export default memo(News)