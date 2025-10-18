import {Formik,Form,Field,ErrorMessage} from 'formik';
import * as Yup from 'yup'; import api from '../api/axiosClient'; import {toast} from '../components/toast';

const schema = Yup.object({
  programId: Yup.number().required('Program ID is required'),
  country:   Yup.string().required('Country is required')
});

export default function ApplicationForm(){
  return (
    <div className="container mt-3">
      <h5>Create Application Draft</h5>
      <Formik initialValues={{programId:'',country:''}} validationSchema={schema}
        onSubmit={async (v,{resetForm})=>{
          try{
            const r = await api.post('/apps',{programId:+v.programId});
            toast('Draft created with id '+r.data.id);
            resetForm();
          }catch(e){ toast('Failed: '+(e?.response?.data?.error||'Error')); }
        }}>
        <Form className="card p-3">
          <label>Program ID</label>
          <Field name="programId" className="form-control"/>
          <ErrorMessage name="programId" component="div" className="text-danger"/>
          <label className="mt-2">Country</label>
          <Field name="country" className="form-control"/>
          <ErrorMessage name="country" component="div" className="text-danger"/>
          <button className="btn btn-primary mt-3">Create Draft</button>
        </Form>
      </Formik>
    </div>
  );
}