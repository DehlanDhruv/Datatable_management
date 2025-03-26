import './Header.css'
import {
ArrowLeft,
  User
} from "lucide-react";


const Header = () =>{
    return(
        <header className='header'>
        <div>
          <ArrowLeft className='header-icons' size={'1.75vw'} />
          <p>File Name</p>
        </div>

        <div>
            <User className='header-icons' size={'1.5vw'} style={{color:'green'}} />
        </div>
      </header>
    )
}

export default Header