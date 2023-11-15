import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AnimatedSroll = ({ animation, duration = 1000, children }) => {
    useEffect(() => {
        AOS.init({
            duration: duration
        }); // Inicializa AOS

        return () => {
            AOS.refresh(); // Actualiza AOS al desmontar el componente
        };
    }, []);

    return (
        <div data-aos={animation}>
            {children}
        </div>
    );
};

export default AnimatedSroll;