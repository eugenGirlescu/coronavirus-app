import React from 'react'
import './App.css'


class CardBody extends React.Component {
    render() {
        return (
            <div>
                <select className="mt-4 col-md-8 col-offset-4" onChange={this.props.onchange}>
                    <option>In total</option>
                    {this.props.renderOptions}
                </select>
                <div className="card-body">
                    <p className="date">{this.props.date}</p>
                    <h4>Rezultatele cautarii:</h4>
                    <p className="body-content">Confirmati: {this.props.confirmed}</p>
                    <p className="body-content">Recuperati: {this.props.recovered}</p>
                    <p className="body-content">Decedati: {this.props.deaths}</p>
                </div>
            </div>
        )
    }
}
export default CardBody;