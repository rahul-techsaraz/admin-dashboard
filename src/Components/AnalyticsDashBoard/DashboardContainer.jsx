import React from 'react'
import AdminDashboard from './AdminDashboard'
import PartnerDashboard from './PartnerDashboard'
import { shallowEqual, useSelector } from 'react-redux'

export default function DashboardContainer() {
  const { userInfo } = useSelector((state) => state.user, shallowEqual)

  if (userInfo.user_role === 'admin_partner') return <PartnerDashboard />
  return <AdminDashboard /> // fallback for admin/superadmin
}
