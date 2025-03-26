import react from 'react'
import {PanelsTopLeft,Blocks ,Cloudy ,AlignVerticalJustifyCenter , Database ,GalleryVertical} from 'lucide-react';
import './Sidebar.css'
import './DataGrid.css';

const Sidebar = () =>{
    return(
        <div className='sidebar'>
        <PanelsTopLeft className='header-icons' size={'1.5vw'} />
        <Blocks className='header-icons' size={'1.5vw'} />
        <AlignVerticalJustifyCenter className='header-icons' size={'1.5vw'} />
        <Cloudy className='header-icons' />
        <Database size={'1.5vw'} className='header-icons' style={{position:'absolute' , bottom:'10%' , color:'#99154B'}}/>
        <GalleryVertical size={'1.5vw'} className='header-icons'  style={{position:'absolute' , bottom:'5%' }}/>
      </div>
    )
}

export default Sidebar