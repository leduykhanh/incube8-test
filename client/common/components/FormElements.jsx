import React,{Component,PropTypes} from 'react'
import FormControl from 'react-bootstrap/lib/FormControl'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Radio from 'react-bootstrap/lib/Radio'
//import escapeRegex from 'lodash/escapeRegExp'
import Checkbox from 'react-bootstrap/lib/Checkbox'
import HelpBlock from 'react-bootstrap/lib/HelpBlock'
import DropdownList from 'react-widgets/lib/DropdownList'
import MultiSelect from 'react-widgets/lib/Multiselect'
import DatePicker from 'react-widgets/lib/Calendar'
import DateTimePicker from 'react-widgets/lib/DateTimePicker'
import ReactS3Uploader from 'react-s3-uploader'
import TinyMCE from 'react-tinymce';
import ProgressBar from 'react-bootstrap/lib/ProgressBar'
import Autosuggest from 'react-autosuggest'
import TagsInput from 'react-tagsinput'
import moment from 'moment';
import RichTextEditor from 'react-rte';
import {toDateString} from '../formatter';
import ReactTelInput from 'react-telephone-input'
//import isObject from 'lodash/isObject'
import {SubmissionError} from 'redux-form'

export  class FieldFormControl extends Component {

  render () {

    const { placeholder, type,after_change, input, meta,label,help,validate,className, inputGroupAddon,maxLength} = this.props;

    let divClass = meta.touched && meta.error?"form-group has-error":"form-group";
    divClass += help?" has-help":"";

    if(inputGroupAddon)
        divClass +=" input-group";
    let labelClass ="";
    if(className)
        labelClass+= " "+className;
    return (
      <div className={divClass} id={"id_"+input.name}>
        {label?<ControlLabel className={labelClass}>{label}</ControlLabel>:""}
        <input className={className +" form-control"} maxLength={maxLength} type={type} placeholder={placeholder} value={input.value}  onChange={(e)=>{input.onChange(e);after_change?after_change(e):"";}} onFocus={input.onFocus} onBlur={input.onBlur} />
          {inputGroupAddon?inputGroupAddon:""}
        {help && <span className="help-block">{help}</span>}
          {meta.touched && ((meta.error && <span className="error-msg"><i className="fa fa-times-circle"></i>&nbsp;{meta.error}</span>) || (meta.warning && <span  className="warning-msg">{meta.warning}</span>))}
      </div>
    );
  }
}

export  class FieldTextAreaControl extends Component {
  constructor(props)
  {
      super(props);
      this.state ={
          "characters":0
      }
  }
  componentWillReceiveProps(nextProps)
  {
      let {input,maxLength} = nextProps;
      if(maxLength)
      {
          let maxCharacters = parseInt(maxLength);
          let length=0;

          if(input && input.value)
              length= input.value.length;

          this.setState({
              "characters": (maxCharacters-length)
          })
      }

  }

  render () {

    const { placeholder, type, input, meta,label,help,validate,className,maxLength} = this.props;
    let divClass = meta.touched && meta.error?"form-group has-error":"form-group"
    divClass += help?" has-help":"";

    let labelClass ="";
    if(className)
        labelClass+= " "+className;
    let counter= "";
    if(maxLength)
        counter = <span className="counter">{this.state.characters + " characters left"}</span>
    return (
      <div className={divClass} id={"id_"+input.name}>
        <ControlLabel className={labelClass}>{label}{counter}</ControlLabel>
        <textarea maxLength={maxLength} className="form-control" placeholder={placeholder} value={input.value} onChange={input.onChange} onFocus={input.onFocus} onBlur={input.onBlur} />
        {help && <span className="help-block">{help}</span>}
          {meta.touched && ((meta.error && <span className="error-msg"><i className="fa fa-times-circle"></i>&nbsp;{meta.error}</span>) || (meta.warning && <span  className="warning-msg">{meta.warning}</span>))}
      </div>
    );
  }
}

export  class FieldRangeControl extends Component {

  render () {

    const { placeholder, type, input, meta,label,help,validate,className} = this.props;
    let divClass = meta.touched && meta.error?"form-group has-error":"form-group"
    divClass += help?" has-help":"";

    let labelClass ="";
    if(className)
        labelClass+= " "+className;
    return (
      <div className={divClass} id={"id_"+input.name}>
        <ControlLabel className={labelClass}>{label}</ControlLabel>
        <input className="form-control" type={type} placeholder={placeholder} value={input.value} onChange={input.onChange} onFocus={input.onFocus} onBlur={input.onBlur} />
        {help && <span className="help-block">{help}</span>}
          {meta.touched && ((meta.error && <span className="error-msg"><i className="fa fa-times-circle"></i>&nbsp;{meta.error}</span>) || (meta.warning && <span  className="warning-msg">{meta.warning}</span>))}
      </div>
    );
  }
}

export  class FieldRadioControl extends Component {

  render () {

    const {type, input, disabled,meta,label,data,options,className,textField,valueField} = this.props;
    let radioInputs = []
    let radioClass = meta.touched && meta.error?"form-group has-error":"form-group";
    radioClass += options && options.horizontal?" horizontal":" vertical";

    let labelClass ="";
    if(className)
        labelClass+= " "+className;

    let _textField = textField?textField:"name";
    let _valueField = valueField?valueField:"value";
    for(let datum of data)
    {
        let checked = "",_disabled="";
        if(input.value.constructor === Array)
        {
            checked = $.inArray(datum[_valueField], input.value)>=0?"checked":"";
            _disabled =  disabled?"disabled":"";
        }
        else {
            checked = (input.value==datum[_valueField])?"checked":"";
            _disabled =  disabled?"disabled":"";
        }

        radioInputs.push(<div className="radio"  key={input.name+"-"+datum[_valueField]}><label className="control-label"><input type="radio" checked={checked} disabled={_disabled} name={input.name} value={datum[_valueField]} onChange={input.onChange} onBlur={input.onBlur} onDrop={input.onDrop}  onDragStart={input.onDragStart} {...input.props}  className="radio"/><span className="circle"></span><span className="check"></span>{datum[_textField]}</label></div>)

    }

    return (
      <div  className={radioClass} id={"id_"+input.name}>
          {label && <ControlLabel className={labelClass}>{label}</ControlLabel>}
          {radioInputs}
        {meta.touched && ((meta.error && <span className="error-msg"><i className="fa fa-times-circle"></i>&nbsp;{meta.error}</span>) || (meta.warning && <span  className="warning-msg">{meta.warning}</span>))}
      </div>
    );
  }
}

export  class FieldCheckboxControl extends Component {

    constructor(props)
    {
        super(props);
        this.renderCheckboxesDefault.bind(this);
        this.renderCheckboxesGrouped.bind(this);
    }
    getCurrentValues() {
        const {input,multi} = this.props;
        if(multi)
        {
            if (input.value == '')
                input.value = [];
        }
        return input.value;
    }

    onChecked(value, event) {

        const {input,multi} = this.props;

        let current_values = this.getCurrentValues();
        if(multi)
        {
            const index = current_values.indexOf(value);
            if (index < 0) {
                if (event.target.checked) {
                    current_values = current_values.concat(value);
                    input.onChange(current_values);
                }
            }
            else {
                if (!event.target.checked) {
                    const copy = [...current_values]; // make copy to not mutate value
                    copy.splice(index, 1);
                    input.onChange(copy);
                }
            }
        }
        else
        {
            input.onChange(event.target.checked);
        }



    }

    renderCheckboxesDefault() {
        let checked = "";
        let checkboxInputs = [];
        const {type, input,multi, meta, label, data, options, className, textField, valueField} = this.props;
        let divClass = className?className:"";
        let _textField = textField ? textField : "name";
        let _valueField = valueField ? valueField : "value";
        let self = this;
        let labelClass = multi?"multi-checkbox":"";
        for (let datum of data) {


            if (input.value.constructor === Array) {
                checked = input.value.indexOf(datum[_valueField]) >= 0 ? "checked" : "";
            }
            else {
                checked = (input.value == datum[_valueField]) ? "checked" : "";
            }
            checkboxInputs.push(<div className={"checkbox "+divClass} key={input.name + "-" + datum[_valueField]}>
                <label className={labelClass+ " control-label"} key={'label_'+input.name + "-" + datum[_valueField]}>
                    <input type="checkbox" name={input.name} value={datum[_valueField]}
                           onChange={self.onChecked.bind(self, datum[_valueField])} className="radio"
                           checked={checked}/>
                    <span className="checkbox-material"><span className="check"></span>
                </span>{datum[_textField]}</label></div>)
        }
        return checkboxInputs;
    }

    renderCheckboxesGrouped() {
        let checked = "";
        let checkboxInputs = [];
        const {type, input, meta, multi,label, data, options, className, textField, valueField} = this.props;
        let _textField = textField ? textField : "name";
        let _valueField = valueField ? valueField : "value";
        let self = this;
        let labelClass = multi?" multi-checkbox":""
        Object.keys(data).forEach(function (key, index) {


            checkboxInputs.push(<label className="control-sublabel"  key={'label_'+index+"_"+input.name}>{key}</label>);
            for (let datum of data[key]) {
                if (input.value.constructor === Array) {
                    checked = input.value.indexOf(datum[_valueField]) >= 0 ? "checked" : "";
                }
                else {
                    checked = (input.value == datum[_valueField]) ? "checked" : "";
                }
                checkboxInputs.push(<div className="checkbox" key={input.name + "-" + datum[_valueField]}>
                    <label className={labelClass+ " control-label"} key={'label_'+input.name + "-" + datum[_valueField]}>
                        <input type="checkbox" name={input.name} value={datum[_valueField]}
                               onChange={self.onChecked.bind(self, datum[_valueField])} className="radio"
                               checked={checked}/>
                        <span className="checkbox-material"><span className="check"></span>
                    </span>{datum[_textField]}</label></div>)
            }
        });
        return checkboxInputs;
    }


  renderCheckboxes()
  {
      let {data} = this.props;
      let checkboxInputs = [];

      if(data.constructor === Array)
      {
          checkboxInputs =  this.renderCheckboxesDefault();
      }
      else
      {
            checkboxInputs =  this.renderCheckboxesGrouped();
      }

      return checkboxInputs;
  }
  render () {

    const {type,multi, input,help, meta,label,data,options,className,textField,valueField} = this.props;

    let checkboxClass = meta.touched && meta.error?"form-group has-error":"form-group";
    checkboxClass += options && options.horizontal?" horizontal":" vertical";
     let labelClass ="";
    if(className)
        labelClass+= " "+className;

    let checkboxInputs = this.renderCheckboxes();
    return (
      <div id={"id_"+input.name} className={checkboxClass}  >
        <ControlLabel className={labelClass}>{label}</ControlLabel>
          {help && <div className="help-text">{help}</div>}
          {checkboxInputs}
        {meta.touched && ((meta.error && <span className="error-msg"><i className="fa fa-times-circle"></i>&nbsp;{meta.error}</span>) || (meta.warning && <span  className="warning-msg">{meta.warning}</span>))}
      </div>
    );
  }
}

FieldCheckboxControl.defaultProps={
    multi: false
}


export  class FieldDateControl extends Component {

  render () {

    const {type,after_change,min,max, input,disabled, meta,label,options, placeholder,time,calendar,className} = this.props;
    let divClass = meta.touched && meta.error?"form-group has-error":"form-group"

      let labelClass ="";
    if(className)
        labelClass+= " "+className;
    let date_format="DD-MMM-YYYY";
    if(options.time)
        date_format  += " HH:mm";

    return (
      <div className={divClass} id={"id_"+input.name}>
          <ControlLabel className={labelClass}>{label}</ControlLabel>
          <DateTimePicker {...input} {...options}
            format={date_format}
            disabled={disabled}
            name={input.name}
            className="form-control"
            min={min?min:new Date(1970,1,1)}
            max={max?max:new Date(2999,12,31)}
            placeholder={placeholder}
            onChange={(date,dateStr)=>{  let formatted_date_string = toDateString(date,date_format);input.onChange(formatted_date_string); after_change?after_change(formatted_date_string):"" }}
            value={input.value===""?null:moment(input.value,date_format).toDate()}
          />
          {meta.touched && ((meta.error && <span className="error-msg"><i className="fa fa-times-circle"></i>&nbsp;{meta.error}</span>) || (meta.warning && <span  className="warning-msg">{meta.warning}</span>))}

      </div>
    );
  }
}

export  class FieldDropdownControl extends Component {

  onChange(value){
      let {input,after_change,valueField} = this.props;
      input.onChange(valueField?value[valueField]:value);
      if(after_change)
          after_change(value);
  }
  render () {

    const { input,rest,after_change, meta,label,filter,data,valueField,textField,className, placeholder,itemComponent} = this.props;
    let divClass = meta.touched && meta.error?"form-group has-error":"form-group";
    let labelClass ="";
    if(className)
        labelClass+= " "+className;
    return (
        <div className={divClass} id={"id_"+input.name}>
            {label?<ControlLabel className={labelClass}>{label}</ControlLabel>:""}
            <DropdownList placeholder={placeholder} filter={filter} className="dropdown form-control" valueField={valueField} textField={textField} data={data} {...input} onChange={(value)=>this.onChange(value)} onFocus={input.onFocus} />
            {meta.touched && ((meta.error && <span className="error-msg"><i className="fa fa-times-circle"></i>&nbsp;{meta.error}</span>) || (meta.warning && <span  className="warning-msg">{meta.warning}</span>))}
        </div>

    );
  }
}

export  class FieldMultiSelectControl extends Component {


  onSelect(value){
      let {input,valueField} = this.props;
      let _val_input = [];
      for(let val of value)
      {
          _val_input= _val_input.concat(val[valueField]);
      }
      input.onChange(_val_input);
  }

  _create(name){
      input.onChange(_val_input);
  }
  render () {

    const { input,rest,create, meta,label,data,valueField,textField,className, defaultValue,tags} = this.props;


    let _select_class=tags?"tags":"";
    let labelClass ="";
    let divClass = meta.touched && meta.error?"form-group has-error":"form-group";

    if(className)
        labelClass+= " "+className;
    let _additional_props = {};
    if(input.value =="")
        input.value = [];
    return (
        <div className={divClass} id={"id_"+input.name}>
            {label?<ControlLabel className={labelClass}>{label}</ControlLabel>:""}
            {create?<MultiSelect {...input} className={_select_class +" form-control"} onCreate={this._create.bind(this)}  valueField={valueField} textField={textField} defaultValue={defaultValue} data={data} onChange={this.onSelect.bind(this)} onFocus={input.onFocus} onBlur={() => input.onBlur()} />:
            <MultiSelect {...input} className={_select_class +" form-control"}   valueField={valueField} textField={textField} defaultValue={defaultValue} data={data} onChange={this.onSelect.bind(this)} onFocus={input.onFocus} onBlur={() => input.onBlur()} />}

            {meta.touched && ((meta.error && <span className="error-msg"><i className="fa fa-times-circle"></i>&nbsp;{meta.error}</span>) || (meta.warning && <span  className="warning-msg">{meta.warning}</span>))}
        </div>

    );
  }
}
FieldMultiSelectControl.defaultProps = {
    create: false
}


export  class FieldFileUpload extends Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this);
    this.onComplete = this.onComplete.bind(this);
    this.onUploadProgress = this.onUploadProgress.bind(this)
    this.onUploadError = this.onUploadError.bind(this)
    this.state = {
        upload_progress:-1,
        error: undefined,
        completed: false,
        url: props.input.value?props.input.value:undefined
    }
  }
  componentsWillReceiveProps(nextProps)
  {
      this.setState({url:nextProps.input.value});
  }
  onComplete(signResult){
      let {after_click} = this.props;
      let signed_url = signResult.signedUrl;
      let url = signed_url.replace(/\?.*$/,'');
      this.setState({
          upload_progress: -1,
          error: undefined,
          completed: true,
          url: url
      })
      const { input: { onChange } } = this.props;
      onChange(url);
      if(after_click)
      {
          after_click();

      }

  }
  onUploadProgress(percent, message){
    // console.log('upload progress - '+percent);
      this.setState({upload_progress: percent})
  }

  onUploadError(message) {
    this.setState({error: message})
  }
  onChange(percent,message) {


  }
  renderHover(){
      let {hover_edit,type,preview_class} = this.props;
      if(hover_edit)
      {
          if(type =="button")
              return this.state.url?<div title="Change photo" className={"hover-edit " +preview_class}></div>:"";
          else
              return <div title="Change photo" className={"hover-edit " +preview_class}></div>;
      }

      else
          return "";
  }
  renderPrompt(){
      const { input,className,label,meta,name,style, type,prompt, show_preview} = this.props;
      let component = "";
       if(type=="button")
            component = <button type="button" style={style} onClick={this.onChange} className="btn-raised action-button clickable">{prompt}</button>
        else if(type=="image")
            component = <img src="/public/static/images/common/default_profile.png" className="img-responsive profile image-uploader"/>
        else
            component = <span style={style} onClick={this.onChange}>{prompt}</span>
      return component;
  }
  showPreview()
  {
      let {preview_class} = this.props;
      return <img  src={this.state.url} className={preview_class+" img-responsive file-upload"}/>
  }
  _onUploadStart (file, cb) {
    let {maxWidth,maxHeight,name} = this.props;
      if(maxWidth)
      {
          console.log(file);
          let extension = (''+file.name).match(/\.[^/.]+$/);
          extension = (extension+'').replace(/\./,'').toLowerCase();
          let fileName = file.name.replace(/\.[^/.]+$/, '')
          if(extension !="png" || extension !="jpg" || extension !="jpeg")
          {

          }
            // Load the image
            let reader = new FileReader()
            reader.onload = (readerEvent) => {
              let image = new Image()
              image.onload = (imageEvent) => {
                // Resize the image
                let canvas = document.createElement('canvas')
                let width = image.width
                let height = image.height

                if (width > height) {

                    height *= maxWidth / width
                    width = maxWidth
                    if(height>maxHeight)
                        height = maxHeight;

                } else {
                    height *= maxWidth / width
                    width = maxWidth
                    if(height>maxHeight)
                        height = maxHeight;

                }
                canvas.width = width
                canvas.height = height
                canvas.getContext('2d').drawImage(image, 0, 0, width, height)
                  console.log(extension);
                let dataUrl = canvas.toDataURL(file.type);
                let resizedImage = this._dataURLToBlob(dataUrl)
                resizedImage.lastModifiedDate = new Date()
                resizedImage.name = file.name

                cb(resizedImage)
              }
              image.src = readerEvent.target.result
            }
            reader.readAsDataURL(file)
      }
      else
      {
          cb(file);
      }


  }
  _dataURLToBlob (dataURL) {
    if(typeof window !== 'undefined'){
      let BASE64_MARKER = ';base64,'
      if (dataURL.indexOf(BASE64_MARKER) === -1) {
        let parts = dataURL.split(',')
        let contentType = parts[0].split(':')[1]
        let raw = parts[1]
        return new Blob([raw], {type: contentType})
      }

      let parts = dataURL.split(BASE64_MARKER)
      let contentType = parts[0].split(':')[1]
      let raw = window.atob(parts[1])
      let rawLength = raw.length
      let uInt8Array = new Uint8Array(rawLength)

      for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i)
      }
      return new Blob([uInt8Array], {type: contentType})
    }
  }
  render() {
    const { input,hover_edit, help,className,label,meta,name,style, type,prompt, show_preview} = this.props
    let divClass = meta.touched && meta.error?"form-group has-error":"form-group"

    let labelClass ="";
    if(className)
        labelClass+= " "+className;
    let component = "";
    if(this.state.url)//if there is already a url
    {
        if(show_preview)
            component = this.showPreview();
        else
            component = this.renderPrompt();
    }
    else
    {
        if(this.state.completed)
        {
            if(show_preview)
                component = this.showPreview();
            else
                component = "";
        }
        else if(this.state.upload_progress>=0)
        {
            component =  <ProgressBar label={`${this.state.upload_progress}%`} striped active now={this.state.upload_progress} />
        }
        else
        {
           component = this.renderPrompt();
        }
    }
    let additionalClass = this.state.url?"has-file":"";
    let self  = this;
    return (

        <div className={className+ " "+ additionalClass+" "+ divClass+ " file-upload"} id={"id_"+input.name}>
            {label && <ControlLabel className={labelClass}>{label}</ControlLabel>}
            <div className="file-upload-content-area">
                {component}
                <ReactS3Uploader
                    className={className}
                    style={style}
                    title="Change photo"
                    name={name}
                    preprocess={this._onUploadStart.bind(this)}
                    onError={this.onUploadError}
                    onProgress={this.onUploadProgress}
                    onFinish={(signResult)=>this.onComplete(signResult)}
                    signingUrl="/upload/s3/sign/"
                    accept="image/*"
                    uploadRequestHeaders={{ 'x-amz-acl': 'public-read' }}
                    contentDisposition="auto"/>
                {this.renderHover()}
           </div>
            {help && <div className="help-text">{help}</div>}
            {meta.touched && ((meta.error && <span className="error-msg"><i className="fa fa-times-circle"></i>&nbsp;{meta.error}</span>) || (meta.warning && <span  className="warning-msg">{meta.warning}</span>))}
        </div>
    )
  }

}
FieldFileUpload.defaultProps = {
    "show_preview": true
}


const editorConfig = {
    plugins: 'link,image,lists,paste,code',
    toolbar: 'undo redo | formatselect bullist numlist | bold italic link | image code paste',
    block_formats: 'Paragraph=p;Heading 3=h3',
    menubar: false,
    statusbar: false,
    body_class: 'editable-field-content',
    paste_word_valid_elements: 'b,strong,i,em,h1,h2,h3,p,li,ul,ol,a',
    paste_retain_style_properties: 'none',
    paste_strip_class_attributes: 'none',
    paste_remove_styles: true,
    content_css : '/public/static/css/tinymce_layout.css'  // resolved to http://domain.mine/myLayout.css
  }
export class FieldTinyMCEControl extends Component {
  constructor(props){
    super(props)

    this.state = {
        loading:false,
    }
  }

  componentWillReceiveProps() {
    // we dont ever need to update this, manages the dom itself
    return false;
  }


  editorContent() {
    return tinyMCE.get(this.props.id) ? tinyMCE.get(this.props.id).getContent() : '';
  }

  renderEditor()
  {
      const { value, labelClass, id,content,input,meta,label,height } = this.props;
      editorConfig["height"] = height;
      if(!this.state.loading)
        {
            return ( <TinyMCE
                        id={id}
                        {...input}
                        className="tinymce"
                        content={input.value}
                        config={editorConfig}
                        onChange={(value)=>{
                            input.onChange(this.editorContent())
                        }}
                        onBlur={() => {
                          input.onBlur();
                          input.onChange(this.editorContent());
                        }}
                      />

                );
        }
        else
      {
          return "";
      }
  }
  render() {

    const { value,className, id,content,input,meta,label } = this.props;
      let divClass = meta.touched && meta.error?"form-group has-error":"form-group";
      let labelClass ="";
    if(className)
        labelClass+= " "+className;
   return <div className={divClass} id={"id_"+ input.name}>
        {label && <ControlLabel className={labelClass}>{label}</ControlLabel>}
            {this.renderEditor()}
            {meta.touched && ((meta.error && <span className="error-msg"><i className="fa fa-times-circle"></i>&nbsp;{meta.error}</span>) || (meta.warning && <span  className="warning-msg">{meta.warning}</span>))}
         </div>

  }
}
FieldTinyMCEControl.propTypes = {
    value: PropTypes.any,
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
  }

/*export class FieldAutocompleteControl extends Component{
    constructor(props)
    {
        super(props);
        this.state ={
            value:"",
            loading: false,
            suggestions:[],
            sequence: 1


        }
    }
    componentWillMount(){
        this.setState({
            sequence:1
        })
    }

    shouldRenderSuggestions(value){

        let {minLength } = this.props;
        if(!minLength)
            minLength= 4;
        return value.length>=minLength;
    }

    getValue(suggestion)
    {

        let {input,valueField,textField,onchange_callback,clear_on_select} = this.props;
        if(suggestion)
        {
            if(valueField)
            {

                if(onchange_callback)
                    onchange_callback(suggestion);

                input.onChange(suggestion);

                return suggestion;
            }
            else
            {


                input.onChange(suggestion)
                return suggestion;
            }

        }
        return "";
    }
    onChange(event, { newValue }){
        let {input,textField} = this.props;

        if(!isObject(newValue))
            input.onChange(newValue);
        else
            newValue = newValue[textField];

        this.setState({
          value: newValue
        });
      };
    // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested({ value }){

      let {loadData,dataCallback,mapItem} = this.props;
      let loadDataPromise = loadData(value,this.state.sequence);
      this.setState({
          sequence: this.state.sequence+1
      })
      loadDataPromise.then((response)=>{
            if (response.error) {
            } else {
                let data = dataCallback(response);
                let _data = [];
                _data = data?Object.keys(data).map((value)=>{return mapItem(data,value)}):[];
                 this.setState({
                      suggestions: _data
                    });
            }
      } );

  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested(){
      let {clearData} = this.props;
    this.setState({
      suggestions: []
    });
  };

    renderSuggestion(suggestion)
    {

        let {textField}= this.props;
        let val ="";
        if(suggestion)
        {
            if(textField)
                val= suggestion[textField]
            else
                val= suggestion
        }
        return val;

    }
    getDisplay(data, textField,value)
    {
        if(textField)
        {
            return data[textField];
        }
        else
        {
            return data;
        }
    }
    render(){
        const { value,placeholder,valueFunction,itemComponent, className, id,meta,label} = this.props;
        let labelClass="";
        if(className)
            labelClass+= " "+className;

        let _valueFunction = valueFunction?valueFunction:this.getValue.bind(this);
        let _itemComponent = itemComponent?itemComponent:this.renderSuggestion.bind(this);

        let inputProps = {
            value: this.state.value,
            onChange: this.onChange.bind(this),
            placeholder: placeholder
        }
        return(<div className="form-group autosuggest" id={"id_"+id}>
            <ControlLabel className={labelClass}>{label}</ControlLabel>
            <Autosuggest
                className={className}
                suggestions={this.state.suggestions}
                shouldRenderSuggestions={this.shouldRenderSuggestions.bind(this)}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}
                getSuggestionValue={_valueFunction}
                renderSuggestion={_itemComponent}
                inputProps={inputProps}
              />
            {meta.touched && ((meta.error && <span className="error-msg"><i className="fa fa-times-circle"></i>&nbsp;{meta.error}</span>) || (meta.warning && <span  className="warning-msg">{meta.warning}</span>))}
        </div>);
    }
}

FieldAutocompleteControl.propTypes ={
    loadData: PropTypes.func.required,
    clearData: PropTypes.func.required,
    clear_on_select: PropTypes.bool
}
FieldAutocompleteControl.defaultTypes ={
    clear_on_select: false
}
*/

export class FieldMultiConnectionsControl extends Component {
  constructor(props){
    super(props)

    this.state = {
        loading:false,
    }
  }
  renderInput()
  {

  }

  renderTable()
  {

  }

  render() {

    const { value, labelClass, id,input,meta,label } = this.props;

   return <div className="form-group" id={"id_"+ input.name}>
         {label && <ControlLabel className={labelClass}>{label}</ControlLabel>}
         {this.renderInput()}
         {this.renderTable()}
         </div>

  }
}

export  class FieldTagControl extends Component {
  constructor() {
    super()
    this.state = {tags: []}
  }

  handleChange(tags) {
    let {input} = this.props;
    this.setState({tags})
    input.onChange(tags);
  }



  render () {

    const { input,rest,create, meta,label,data,valueField,textField,className, defaultValue,tags} = this.props;


    let _select_class=tags?"tags":"";
    let labelClass ="";


    if(className)
        labelClass+= " "+className;
    let _value = [];
    if(input.value)
    {
        if(input.value.constructor==String)
            _value = input.value.split(",");
        else
            _value = input.value;
    }


    return (
        <div className="form-group" id={"id_"+input.name}>
            <ControlLabel className={labelClass}>{label}</ControlLabel>
            <TagsInput {...input} value={_value} className={_select_class +" form-control"}   onChange={this.handleChange.bind(this)} onFocus={input.onFocus} onBlur={() => input.onBlur()} />
            {meta.touched && ((meta.error && <span className="error-msg"><i className="fa fa-times-circle"></i>&nbsp;{meta.error}</span>) || (meta.warning && <span  className="warning-msg">{meta.warning}</span>))}
        </div>

    );
  }
}

export  class FieldImageCheckboxControl extends Component {


  renderCheckboxes()
  {
      let {data,input,valueField,textField} = this.props;
      let checkboxInputs = [];
      let selected_value = input.value;
      if(data.constructor === Array)
      {
          for(let datum of data)
          {
            let src = "";

            if(selected_value == datum[valueField])
                src = datum["selected"];
            else
                src = datum["src"];

            checkboxInputs = checkboxInputs.concat(<img className={datum["class"]} onClick={(e)=>{input.onChange(datum[valueField])}} key={"display_"+datum.value}  src={src}/>)
          }

      }

      return checkboxInputs;
  }
  render () {

    const {input,help, meta} = this.props;

    let checkboxClass = meta.touched && meta.error?"form-group has-error":"form-group";
    checkboxClass += " view-display";


    let checkboxInputs = this.renderCheckboxes();
    return (
      <div id={"id_"+input.name} className={checkboxClass}  >
          {help && <div className="help-text">{help}</div>}
          {checkboxInputs}
      </div>
    );
  }
}
const toolbarConfig = {
    // Optionally specify the groups to display (displayed in the order listed).
    display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
    INLINE_STYLE_BUTTONS: [
      {label: 'Bold', style: 'BOLD', className: 'custom-css-class'},
      {label: 'Italic', style: 'ITALIC'},
      {label: 'Underline', style: 'UNDERLINE'}
    ],
    BLOCK_TYPE_DROPDOWN: [
      {label: 'Normal', style: 'unstyled'},
      {label: 'Heading Large', style: 'header-one'},
      {label: 'Heading Medium', style: 'header-two'},
      {label: 'Heading Small', style: 'header-three'}
    ],
    BLOCK_TYPE_BUTTONS: [
      {label: 'UL', style: 'unordered-list-item'},
      {label: 'OL', style: 'ordered-list-item'}
    ]
  };


export class FieldDraftControl extends Component {
  constructor(props) {
    super(props);
    let {input} = props;
    let {value} = input;
    let content = "";
    if(value)
        content = RichTextEditor.createValueFromString(value,'html');
    else
        content = RichTextEditor.createEmptyValue();
    this.state = {editorState: content};
  }
  onChange(editorState){
      let {input} = this.props;
      if(input.onChange)
        input.onChange(editorState.toString('html'));
      this.setState({editorState});
  }




  renderEditor()
  {
      const { value, labelClass, id,content,input,meta,label,height,placeholder } = this.props;

      return <RichTextEditor placeholder={placeholder} className="form-control rte"  toolbarConfig={toolbarConfig} value={this.state.editorState} onChange={this.onChange.bind(this)} />

  }
  render() {

    const { value,className, id,content,input,meta,label } = this.props;
    let divClass = meta.touched && meta.error !==undefined?"form-group has-error":"form-group";

    let labelClass ="";
    if(className)
        labelClass+= " "+className;

   return <div className={divClass} id={"id_"+ input.name}>
        {label && <ControlLabel className={labelClass}>{label}</ControlLabel>}
            {this.renderEditor()}
            {meta.touched && ((meta.error && <span className="error-msg"><i className="fa fa-times-circle"></i>&nbsp;{meta.error}</span>) || (meta.warning && <span  className="warning-msg">{meta.warning}</span>))}
         </div>

  }
}


export class FieldTelephoneControl extends Component {
  constructor(props) {
    super(props);

  }
  onChange(telNumber, selectedCountry){
      const { values, names,className, id,input,meta,label,validate } = this.props;
      console.log('dialcode'+selectedCountry.dialCode);
      console.log('telnum'+telNumber);
      let tel="";

      telNumber = telNumber.replace("+","");
      let dialCodeRegex = new RegExp("^"+selectedCountry.dialCode+" ?");
      tel = telNumber.replace(dialCodeRegex,'');



      let tel_no = this.props[names[0]];
      let cty_code = this.props[names[1]];
      console.log('tel:'+tel);
      console.log('selected dialcode: '+selectedCountry.dialCode);
      tel_no.input.onChange(tel);
      cty_code.input.onChange(selectedCountry.dialCode);
  }

  render() {

    const { value, names,className, id,input,meta,label } = this.props;
    let tel_no = this.props[names[0]];
    let cty_code = this.props[names[1]];
    let divClass = (tel_no.meta.touched && tel_no.meta.error) || (cty_code.meta.touched && cty_code.meta.error)?"form-group has-error":"form-group";
    let labelClass ="";
    if(className)
        labelClass+= " "+className;

   return <div className={divClass} id={"id_"+ names[0]+'_'+names[1]}>
        {label && <ControlLabel className={labelClass}>{label}</ControlLabel>}
            <ReactTelInput
                initialValue={tel_no.input.value}
                defaultCountry="sg"
                flagsImagePath='/public/static/images/common/flags.png'
                onChange={this.onChange.bind(this)}
                />
            {tel_no.meta.touched && ((tel_no.meta.error && <span className="error-msg"><i className="fa fa-times-circle"></i>&nbsp;{tel_no.meta.error}</span>) || (tel_no.meta.warning && <span  className="warning-msg">{tel_no.meta.warning}</span>))}
            {cty_code.meta.touched && ((cty_code.meta.error && <span className="error-msg"><i className="fa fa-times-circle"></i>&nbsp;{cty_code.meta.error}</span>) || (cty_code.meta.warning && <span  className="warning-msg">{cty_code.meta.warning}</span>))}
         </div>

  }
}

