import { FaWhatsapp } from 'react-icons/fa';

const WhatsappButton = () => {
  const phoneNumber = '41997860063';
  const message = encodeURIComponent('Olá! Gostaria de mais informações.');

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 z-50 flex items-center justify-center"
      aria-label="Contato via WhatsApp"
    >
      <FaWhatsapp size={32} />
    </a>
  );
};

export default WhatsappButton; 