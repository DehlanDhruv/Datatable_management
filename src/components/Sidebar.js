import react from 'react'
import {PanelsTopLeft,Blocks ,Cloudy ,AlignVerticalJustifyCenter , Database ,GalleryVertical} from 'lucide-react';
import './Sidebar.css'

const Sidebar = () =>{
    return(
        <div className='sidebar'>
        <PanelsTopLeft size={'1.5vw'} />
        <Blocks size={'1.5vw'} />
        <AlignVerticalJustifyCenter  size={'1.5vw'} />
        <Cloudy />
        <Database size={'1.5vw'} style={{position:'absolute' , bottom:'10%' , color:'#99154B'}}/>
        <GalleryVertical size={'1.5vw'}  style={{position:'absolute' , bottom:'5%' }}/>
      </div>
    )
}

export default Sidebar