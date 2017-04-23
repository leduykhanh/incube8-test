import Notifications from 'react-notification-system-redux';

 const notify_error = (dispatch,title,message,action) => {

  dispatch(Notifications.error({
       // uid: 'once-please', // you can specify your own uid if required
      title: title,
      message: message,
      position: 'tr',
      autoDismiss: 3,
      action: action
  }))
};

 const notify_warn = (dispatch,title,message,action) => {

  dispatch(Notifications.warn({
       // uid: 'once-please', // you can specify your own uid if required
      title: title,
      message: message,
      position: 'tr',
      autoDismiss: 3,
      action: action
  }))
};

 const notify_info = (dispatch,title,message,action) => {
  
  dispatch(Notifications.info({
       // uid: 'once-please', // you can specify your own uid if required
      title: title,
      message: message,
      position: 'tr',
      autoDismiss: 3,
      action: action
  }))
};
const notify_success = (dispatch,title,message,action) => {
  dispatch(Notifications.success({
       // uid: 'once-please', // you can specify your own uid if required
      title: title,
      message: message,
      position: 'tr',
      autoDismiss: 3,
      action: action
  }))
};

export default {
    notify_error: notify_error,
    notify_warn: notify_warn,
    notify_info: notify_info,
    notify_success: notify_success
}