import React from 'react'

function Alert(props) {
  // const capitalize = (word)=>{
  //     const lower = word.toLowerCase();
  //     return lower.charAt(0).toUpperCase() + lower.slice(1);
  // }
  return (
    <div className='position-absolute' style={{height: '50px', width:'100%'}}>
    {props.alert && <div className={`col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-${props.alert.type}  alert-with-icon animated fadeInDownalert `} style={{display: "inline-block", margin: "0px auto", position: "fixed", transition: "all 0.5s ease-in-out 0s", zIndex: "1031", bottom: "20px", right: "20px"}} role="alert">
      <span>{props.alert.msg} </span>
    </div>}
    </div>
    // <div data-notify="container" className="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-warning alert-with-icon animated fadeInDown" role="alert" data-notify-position="bottom-right" style="display: inline-block; margin: 0px auto; position: fixed; transition: all 0.5s ease-in-out 0s; z-index: 1031; bottom: 20px; right: 20px;"><span data-notify="title"></span> <span data-notify="message">Welcome to <b>Material Dashboard</b> - a beautiful freebie for every web developer{props.alert}.</span><a href="#" target="_blank" data-notify="url"></a></div>
  )
}

export default Alert