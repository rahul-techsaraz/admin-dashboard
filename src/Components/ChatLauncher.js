import React from 'react'
import avatarLogo2 from "../assets/images/xs/avatar2.jpg"
import avatarLogo3 from "../assets/images/xs/avatar3.jpg"
import avatarLogo4 from "../assets/images/xs/avatar4.jpg"
import avatarLogo6 from "../assets/images/xs/avatar6.jpg"
import avatarLogo1 from "../assets/images/xs/avatar1.jpg"
import { Link } from 'react-router-dom'

export default function ChatLauncher() {
  return (
    <>
           {/* chat launcher section starts */}
   
<div>
  <div className="chat-launcher" />
  <div className="chat-wrapper">
    <div className="card">
      <div className="header">
        <ul className="list-unstyled team-info margin-0">
          <li className="m-r-15"><h2>Agent Team</h2></li>
          <li><img src={avatarLogo2} alt="Avatar" /></li>
          <li><img src={avatarLogo3} alt="Avatar" /></li>
          <li><img src={avatarLogo4} alt="Avatar" /></li>
          <li><img src={avatarLogo6} alt="Avatar" /></li>
          <li><Link to={'/'} title="Add Member"><i className="zmdi zmdi-plus-circle" /></Link></li>
        </ul>                       
      </div>
      <div className="body">
        <div className="chat-widget">
          <ul className="chat-scroll-list clearfix">
            <li className="left float-left">
              <img src={avatarLogo3} className="rounded-circle" alt />
              <div className="chat-info">
                <a className="name" href="javascript:void(0);">Alexander</a>
                <span className="datetime">6:12</span>                            
                <span className="message">Hello, John </span>
              </div>
            </li>
            <li className="right">
              <div className="chat-info"><span className="datetime">6:15</span> <span className="message">Hi, Alexander<br /> How are you!</span> </div>
            </li>
            <li className="right">
              <div className="chat-info"><span className="datetime">6:16</span> <span className="message">There are many variations of passages of Lorem Ipsum available</span> </div>
            </li>
            <li className="left float-left"> <img src={avatarLogo2} className="rounded-circle" alt />
              <div className="chat-info"> <Link className="name" to={'/'}>Elizabeth</Link> <span className="datetime">6:25</span> <span className="message">Hi, Alexander,<br /> John <br /> What are you doing?</span> </div>
            </li>
            <li className="left float-left"> <img src={avatarLogo1} className="rounded-circle" alt />
              <div className="chat-info"> <Link className="name" to={'/'}>Michael</Link> <span className="datetime">6:28</span> <span className="message">I would love to join the team.</span> </div>
            </li>
            <li className="right">
              <div className="chat-info"><span className="datetime">7:02</span> <span className="message">Hello, <br />Michael</span> </div>
            </li>
          </ul>
        </div>
        <div className="input-group p-t-15">
          <input type="text" className="form-control" placeholder="Enter text here..." />
          <span className="input-group-addon">
            <i className="zmdi zmdi-mail-send" />
          </span>
        </div>
      </div>
    </div>
  </div>
</div>
    </>
  )
}
