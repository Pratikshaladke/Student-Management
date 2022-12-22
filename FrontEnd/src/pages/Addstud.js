import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {uploadFile} from '../services/upload.service'

export default function AddStud() {
    const [input,setInput] = useState({
        name:'',
        email:'',
        class:'',
        subject1: '',
        subject2 : '',
        image: null
    })

    const [img, setImg] = useState();

    const [responseMsg,setResponseMsg] = useState('')
   const Navigate= useNavigate();
    const handleSubmit = async (e) => {
      e.preventDefault();
      // console.log("Page submit stop");
      console.log(input);
      const formdata = new FormData();
      formdata.append('image', input.image);
      formdata.append('name', input.name);
      formdata.append('email', input.email);
      formdata.append('class', input.class);
      formdata.append('subject1', input.subject1);
      formdata.append('subject2', input.subject2);

      try {
          const apiResponse = await uploadFile(formdata);
          console.log(apiResponse)
          setImg(apiResponse.data.data.path);
          console.log(img)
          if(apiResponse.data.status === 200){
            Navigate("/Dashboard")
          }
      }
      catch (e) {
          console.log(e, "error");
      }
  }

  const onFileChange = (e) => {
      console.log(e.target.files[0]);
      setInput((previous) => ({
          ...previous,
          image: e.target.files[0],
      }))
  }
  const onInputChange = (e) => {
      const {name,value} = e.target
      setInput((previous) => ({
          ...previous,
          [name]: value,
      }))
  }

      
  
//   VALIDATIONS
    const [valid,setValid] = useState({
        name : true,
        email:true,
        class:true,
        subject1: true,
        subject2: true,
        nameError:'',
        emailError:'',
        classError:'',
        subject1Error: '',
        subject2Error: ''
    })

    const nameValidation = (name) => {
        if(name.length === 0 ){
          setValid((previousValue) => ({
            ...previousValue,
            name:false,
            nameError:"Please enter your fullname"
          }))
        }else{
          setValid((previousValue) => ({
            ...previousValue,
            name:true,
            nameError:""
          }))
        }
      }

    const emailValidation = (email) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailIsValid = pattern.test(email);
       
        if(emailIsValid){
          setValid((previousValue) => ({
            ...previousValue,
            email:true,
            emailError:""
          }))
        }else{
          setValid((previousValue) => ({
            ...previousValue,
            email:false,
            emailError:"Please enter your email address"
          }))
        }
    }

    //   const classValidation = (class) => {
    //     if(class.length === 0 ){
    //       setValid((previousValue) => ({
    //         ...previousValue,
    //         class:false,
    //         classError:"Please enter your message"
    //       }))
    //     }else{
    //       setValid((previousValue) => ({
    //         ...previousValue,
    //         class:true,
    //         classError:""
    //       }))
    //     }
    //   }

    const sub1Validation = (subject1) => {
      if(subject1.length === 0 ){
        setValid((previousValue) => ({
          ...previousValue,
          subject1:false,
          subject1Error:"Please enter subject1 marks"
        }))
      }else{
        setValid((previousValue) => ({
          ...previousValue,
          subject1:true,
          subject1Error:""
        }))
      }
    }

    const sub2Validation = (subject2) => {
      if(subject2.length === 0 ){
        setValid((previousValue) => ({
          ...previousValue,
          subject2:false,
          subject2Error:"Please enter subject2 marks"
        }))
      }else{
        setValid((previousValue) => ({
          ...previousValue,
          subject2:true,
          subject2Error:""
        }))
      }
    }

    const handleChange = (e) => {
        const{name,value} = e.target;

        setInput((previousValue) => ({
            ...previousValue,
            [name] : value
        }))
    }

  
  return (
    <div className="container my-5">
            <div className="row">
            <div className="col-md-4"></div>
                <div className="col-md-4">
                    <div className="form-control">
                        <section>
                            <h3 className="text-center">Add Student Marks</h3>
                            
                            <form action="" method="post" encType="multipart/form-data" onSubmit = {(e) => handleSubmit(e)}>
                              <div className="c">
                              <label> Name  </label>
                            <input className="form-control" name="name" placeholder="Enter your name" onBlur={(e) => nameValidation(e.target.value)} onChange={(e) => onInputChange(e)}/>
                            {!valid.name && <span className="text-danger">{valid.nameError}</span>}<br/></div>

                            
                              <label> Email  </label>
                            <input className="form-control" name="email" placeholder="Enter your email" onBlur={(e) => emailValidation(e.target.value)} onChange={(e) => handleChange(e)}/>
                            {!valid.email && <span className="text-danger">{valid.emailError}</span>}<br/>

                            <label>Class</label>
                            <textarea className="form-control" name="message" type="text" placeholder="Enter your Class" onChange={(e)=>handleChange(e)}></textarea>
                            {!valid.message && <span className="text-danger">{valid.messageError}</span>}<br/>

                            <label>Subject 1</label>
                            <textarea className="form-control" name="message" type="text" placeholder="Enter subject 1 marks" onBlur={(e) => sub1Validation(e.target.value)} onChange={(e)=>handleChange(e)}></textarea>
                            {!valid.subject1 && <span className="text-danger">{valid.subject1Error}</span>}<br/>

                            <label>Subject 2</label>
                            <textarea className="form-control" name="message" type="text" placeholder="Enter subject 2 marks"  onBlur={(e) => sub2Validation(e.target.value)} onChange={(e)=>handleChange(e)}></textarea>
                            {!valid.subject2 && <span className="text-danger">{valid.subject2Error}</span>}<br/>

                            <label>Upload Image</label><br/>
                             &nbsp; &nbsp; &nbsp; &nbsp; 
                            <input type="file" name="image" onChange={(e) => onFileChange(e)} /><br/><br/>

                            <button type="button" class="btn btn-success btn-block mb-4" >Submit</button><br/>

                            {<b className="text-info">{responseMsg}</b>}
                            </form>
                        </section>
                    </div>
                </div>
                <div className="col-md-10"></div>
            </div>
        </div>
  )
}
