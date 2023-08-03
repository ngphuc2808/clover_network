import React from 'react';
import bgImg from '../assets/img1.jpg';
import{useForm} from 'react-hook-form';

export default function Form() {
    const {register, handleSubmit, watch, formState:{errors}} = useForm();
    const onSubmit = data => console.log(data);

  return (
    <section>
        <div className='register'>
          <div className='col-1'>
            <h1>Clover Network</h1>
            <span>Connecting people</span>

            <form id='form' className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
              <input type='email' {...register("email")} placeholder='Email'/>
              <input type='password' {...register("password")} placeholder='Password'/>
              <input type='password' {...register("confirmPwd")} placeholder='Confirm Password'/>
              <input type='text' {...register("fullname")} placeholder='Fullname'/>
              <input type='number' {...register("mobileNo", {required:true, maxLength:10})} placeholder='Mobile number'/>
              {errors.mobileNo?.type === "required" && "Mobile Number is required"}
              {errors.mobileNo?.type === "maxLength" && "Max length exceed"}

              <button className='btn'>Sign In</button>
            </form>
          </div>
          <div className='col-2'>
            <img src={bgImg} alt=''/>
          </div>
        </div>
      </section>
  )
}
