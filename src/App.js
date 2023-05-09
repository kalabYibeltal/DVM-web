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


function App() {
  return (
    <BrowserRouter>
		<Routes>
			<Route path="/" element={<Appbar />}>
				<Route path="/" element={<Login />} />
						<Route path="home/" element={<Home />} > 
							<Route path="machines" element={<Machines />} />
							<Route path="machine/:name" element={<Machine />} />
							<Route path="edititem/:name" element={<EditItem />} />
							<Route path="miscellaneous" element={<Miscellaneous />} />
							<Route path="addmachine" element={<AddMachine />} />
						</Route>
						<Route path="*" element={<h1>Landing</h1>} />
					<Route path="*" element={<h1>404: Not Found</h1>} />
				
			</Route>
		</Routes>
    </BrowserRouter>
  );
}

export default App;
