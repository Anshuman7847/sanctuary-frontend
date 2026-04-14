import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { axiosInstance } from '../../api/axiosinstance';
import AuthLoadingScreen from './AuthLoadingScreen';

const PublicRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(false);

  useEffect(()=>{
    let mounted = true;
    axiosInstance.get('/profile/token').then(()=>{
      if(mounted){ setAuthed(true); setLoading(false); }
    }).catch(()=>{
      if(mounted){ setAuthed(false); setLoading(false); }
    })
    return ()=>{ mounted=false }
  },[])

  if(loading) return <AuthLoadingScreen />;
  if(authed) return <Navigate to="/dashboard" replace />;
  return children;
}

export default PublicRoute;
