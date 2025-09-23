import { useAuth } from "@/components/provider/AuthProvider";

const Profile = () => {
  const { currentUser} = useAuth()
  return (
    <div>
     <h1>{currentUser?.userName}</h1>
    <p>{currentUser?.email}</p>
     
      
    </div>
  )
}

export default Profile