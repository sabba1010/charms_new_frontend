const ContactMap = () => {
  return (
    <section className="w-full h-[500px] bg-slate-200">
      <iframe 
        title="Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.288949575975!2d-0.12210818423000624!3d51.50329727963554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604b900d26973%3A0x4291f3172409ea92!2sThe%20London%20Eye!5e0!3m2!1sen!2suk!4v1652355555555!5m2!1sen!2suk" 
        width="100%" 
        height="100%" 
        style={{ border: 0 }} 
        allowFullScreen={true} 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </section>
  );
};

export default ContactMap;
