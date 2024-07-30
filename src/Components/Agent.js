import React from 'react'
import avtimg from '../assets/images/xs/avatar4.jpg'
import avtimg1 from '../assets/images/xs/avatar5.jpg'
import avtimg2 from '../assets/images/xs/avatar6.jpg'
import avtimg3 from '../assets/images/xs/avatar7.jpg'

export default function Agent() {
  return (
    <>
      <div className='container-fluid'>
        <div className='row clearfix'>
          <div className='col-lg-12'>
            <div className='card'>
              <div className='body'>
                <div className='table-responsive'>
                  <table className='table td_2 table-striped table-hover js-basic-example dataTable vcenter'>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>City</th>
                        <th>Rating</th>
                        <th>Deal</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>
                          <img src={avtimg} className='w30 rounded mr-2' alt /> Karen Eilla Boyette
                        </td>
                        <td>areneboyette@armyspy.com</td>
                        <td>+502-324-4194</td>
                        <td>Manchester</td>
                        <td className='text-warning'>
                          <i className='zmdi zmdi-star' />
                          <i className='zmdi zmdi-star' />
                          <i className='zmdi zmdi-star' />
                          <i className='zmdi zmdi-star' />
                          <i className='zmdi zmdi-star' />
                        </td>
                        <td>53</td>
                        <td>$2,800</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>
                          <img src={avtimg1} className='w30 rounded mr-2' alt /> Walter Devid Moye
                        </td>
                        <td>areneboyette@armyspy.com</td>
                        <td>+502-324-1245</td>
                        <td>Chicago</td>
                        <td className='text-warning'>
                          <i className='zmdi zmdi-star' />
                          <i className='zmdi zmdi-star' />
                          <i className='zmdi zmdi-star' />
                        </td>
                        <td>51</td>
                        <td>$25,800</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td>
                          <img src={avtimg2} className='w30 rounded mr-2' alt /> Linda Dina Pate
                        </td>
                        <td>areneboyette@armyspy.com</td>
                        <td>+502-324-2583</td>
                        <td>Manchester</td>
                        <td className='text-warning'>
                          <i className='zmdi zmdi-star' />
                          <i className='zmdi zmdi-star' />
                          <i className='zmdi zmdi-star' />
                        </td>
                        <td>201</td>
                        <td>$320,800</td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td>
                          <img src={avtimg3} className='w30 rounded mr-2' alt /> Karen Eilla Boyette
                        </td>
                        <td>areneboyette@armyspy.com</td>
                        <td>+502-324-4578</td>
                        <td>Manchester</td>
                        <td className='text-warning'>
                          <i className='zmdi zmdi-star' />
                          <i className='zmdi zmdi-star' />
                        </td>
                        <td>53</td>
                        <td>$21,800</td>
                      </tr>
                      <tr>
                        <td>5</td>
                        <td>
                          <img src={avtimg1} className='w30 rounded mr-2' alt /> Walter Devid Moye
                        </td>
                        <td>areneboyette@armyspy.com</td>
                        <td>+502-324-5689</td>
                        <td>New Jersy</td>
                        <td className='text-warning'>
                          <i className='zmdi zmdi-star' />
                          <i className='zmdi zmdi-star' />
                          <i className='zmdi zmdi-star' />
                        </td>
                        <td>108</td>
                        <td>$65,800</td>
                      </tr>
                      <tr>
                        <td>6</td>
                        <td>
                          <img src='assets/images/xs/avatar6.jpg' className='w30 rounded mr-2' alt /> Linda Dina Pate
                        </td>
                        <td>areneboyette@armyspy.com</td>
                        <td>+502-324-7485</td>
                        <td>Manchester</td>
                        <td className='text-warning'>
                          <i className='zmdi zmdi-star' />
                          <i className='zmdi zmdi-star' />
                          <i className='zmdi zmdi-star' />
                          <i className='zmdi zmdi-star' />
                        </td>
                        <td>250</td>
                        <td>$651,800</td>
                      </tr>
                      <tr>
                        <td>7</td>
                        <td>
                          <img src='assets/images/xs/avatar7.jpg' className='w30 rounded mr-2' alt /> Karen Eilla Boyette
                        </td>
                        <td>areneboyette@armyspy.com</td>
                        <td>+502-324-4194</td>
                        <td>Manchester</td>
                        <td className='text-warning'>
                          <i className='zmdi zmdi-star' />
                          <i className='zmdi zmdi-star' />
                          <i className='zmdi zmdi-star' />
                          <i className='zmdi zmdi-star' />
                        </td>
                        <td>53</td>
                        <td>$2,800</td>
                      </tr>
                      <tr>
                        <td>8</td>
                        <td>
                          <img src='assets/images/xs/avatar8.jpg' className='w30 rounded mr-2' alt /> Walter Devid Moye
                        </td>
                        <td>areneboyette@armyspy.com</td>
                        <td>+502-324-1245</td>
                        <td>New Delhi</td>
                        <td className='text-warning'>
                          <i className='zmdi zmdi-star' />
                          <i className='zmdi zmdi-star' />
                          <i className='zmdi zmdi-star' />
                        </td>
                        <td>51</td>
                        <td>$25,800</td>
                      </tr>
                      <tr>
                        <td>9</td>
                        <td>
                          <img src='assets/images/xs/avatar9.jpg' className='w30 rounded mr-2' alt /> Linda Dina Pate
                        </td>
                        <td>areneboyette@armyspy.com</td>
                        <td>+502-324-2583</td>
                        <td>New York</td>
                        <td className='text-warning'>
                          <i className='zmdi zmdi-star' />
                          <i className='zmdi zmdi-star' />
                          <i className='zmdi zmdi-star' />
                          <i className='zmdi zmdi-star' />
                        </td>
                        <td>185</td>
                        <td>$52,800</td>
                      </tr>
                      <tr>
                        <td>10</td>
                        <td>
                          <img src='assets/images/xs/avatar4.jpg' className='w30 rounded mr-2' alt /> Karen Eilla Boyette
                        </td>
                        <td>areneboyette@armyspy.com</td>
                        <td>+502-324-5263</td>
                        <td>Los Angles</td>
                        <td className='text-warning'>
                          <i className='zmdi zmdi-star' />
                          <i className='zmdi zmdi-star' />
                          <i className='zmdi zmdi-star' />
                          <i className='zmdi zmdi-star' />
                          <i className='zmdi zmdi-star' />
                        </td>
                        <td>53</td>
                        <td>$21,800</td>
                      </tr>
                      <tr>
                        <td>11</td>
                        <td>
                          <img src='assets/images/xs/avatar5.jpg' className='w30 rounded mr-2' alt /> Walter Devid Moye
                        </td>
                        <td>areneboyette@armyspy.com</td>
                        <td>+502-324-6358</td>
                        <td>Manchester</td>
                        <td className='text-warning'>
                          <i className='zmdi zmdi-star' />
                          <i className='zmdi zmdi-star' />
                          <i className='zmdi zmdi-star' />
                        </td>
                        <td>108</td>
                        <td>$65,800</td>
                      </tr>
                      <tr>
                        <td>12</td>
                        <td>
                          <img src='assets/images/xs/avatar6.jpg' className='w30 rounded mr-2' alt /> Linda Dina Pate
                        </td>
                        <td>areneboyette@armyspy.com</td>
                        <td>+502-324-6598</td>
                        <td>Los Angles</td>
                        <td className='text-warning'>
                          <i className='zmdi zmdi-star' />
                        </td>
                        <td>78</td>
                        <td>$23,800</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
