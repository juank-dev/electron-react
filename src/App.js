import { useState } from "react";

function App() {
  const [name, setName] = useState(null);


  const handleAlert = () => {
    
    window.electron.notificationApi.sendNotification(`hola Mundo! ${name}`);

  } 


  return (
    <div className="App p-3" style={{backgroundColor: "#dafaff", minHeight: "100vh"}}>
      <h1>App Electron + React</h1>
      <hr />
      <h3>Demo: Alerta Medik </h3>
      <div className="alert alert-primary m-3" role="alert">
        Una simple alerta hacer click en el boton
        <hr />
        <input type="text" className="form-control mb-3 w-25" placeholder="Mensaje" aria-label="Username" aria-describedby="basic-addon1" onChange={(e) => setName(e.target.value)} />
        <button type="button" className="btn btn-success" onClick={handleAlert}>Alerta</button>
      </div>

    </div>
  );
}

export default App;
