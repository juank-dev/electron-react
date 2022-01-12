
export const AlertView = ({time}) => {
  
  return (
    <div>
      <h4>Alerta Medik</h4>
      <hr />
      <div className="alert alert-primary" role="alert">
        informacion interna 
        <hr />
        Fecha: {time}
      </div>
    </div>
  );
}

