import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Appbar from "./components/Appbar"
import Login from "./components/Login"
import Home from "./components/Home";
import Machines from "./components/Machines";
import Miscellaneous from "./components/Miscellaneous";
import AddMachine from "./components/AddMachine";
import Machine from "./components/Machine";
import EditItem from "./components/EditItem";
import Locations from "./components/Locations"
import Loginback from "./Background/Loginback";
import Homeback from "./Background/landingback";
import Landingpage from "./components/Landingpage";
import Feedback from "./components/feedback";	
import Authenticate from "./components/Authenticate";


function App() {
   
  return (
    <BrowserRouter>
		<Routes>

			<Route >

				<Route path="/" element={<Landingpage/> } />
				
				<Route path="appbar" element={<Appbar />} >

					<Route path="login" element={<Login />} />
					
					<Route element={<Authenticate />}>
						<Route path="home/" element={<Home />} > 
							<Route path="" element={<Homeback />} />
							<Route path="machines" element={<Machines />} />
							<Route path="machine/:res1" element={<Machine />} />
							<Route path="location/:name" element={<Locations />} />
							<Route path="edititem/:name" element={<EditItem />} />
							<Route path="miscellaneous" element={<Miscellaneous />} />
							<Route path="feedback" element={<Feedback />} />
							<Route path="addmachine" element={<AddMachine />} />
						</Route>
							<Route path="*" element={<h1>Landing</h1>} />
					
					</Route>
					<Route path="*" element={<h1>404: Not Found</h1>} />
				</Route>
			
			</Route>

		</Routes>
    </BrowserRouter>
  );
}

export default App;
