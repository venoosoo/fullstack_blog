import React from "react";
import Header from './Header';
import Description from "./Description";


const About = () => {
    const description_data = {
        'image': '/api/image/IMG_20240125_185726_413.jpg',
        'text': 'талановитий, мислитель, чарівний, захоплююча особистість, геній , альфа і омега , елегантний, пречудовий або просто Сергій. Мені 16 років я навчаюся в 11 класі і планую в майбутньому поступити на кафедру компютерної інженереї. Я маю декілька хобі про які я написав в своїх постах одне з них це програмування за допомогою якого я зробив цей сайт і його можливості надіюся вам сподобається моя реалізація :/'
    }

    return (
        <div>
            <Header />
            <h1 className='about-text'>Про мене</h1>
            <Description data={description_data} />
        </div>
    );
}

export default About;

