import {useState, useRef} from 'react';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const serviceId = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY;

    const formRef = useRef(null)
    const [form, setForm] = useState({ name: '', email: '', message: ''})
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log(`🚀 ~ Contact ~ form:`, form)
        console.log(`🚀 ~ Contact ~ publicKey:`, publicKey)
        emailjs.init({
            publicKey,
            // Do not allow headless browsers
            blockHeadless: true,
            blockList: {
              // Block the suspended emails
              list: ['foo@emailjs.com', 'bar@emailjs.com'],
              // The variable contains the email address
              watchVariable: 'userEmail',
            },
            limitRate: {
              // Set the limit rate for the application
              id: 'app',
              // Allow 1 request per 10s
              throttle: 10000,
            },
          });

        emailjs.send(
            serviceId,
            templateId,
            {
                from_name: form.name,
                to_name: "Sang Nguyen",
                from_email: form.email,
                to_email: "sang.nguyen.chainstack@gmail.com",
                message: form.message,
            },
        ).then((result) => {
            console.log(`🚀 ~ ).then ~ result:`, result)
            setIsLoading(false);
            // setForm({ name: '', email: '', message: ''});
            formRef.current.reset();
            alert('Message sent successfully');
        }).catch((error) => {
            console.log(`🚀 ~ ).then ~ error:`, error)
        })
    }
    const handleFocus = () => {}
    const handleBlur = () => {}

    return (
        <section className="relative flex lg:flex-row flex-col max-container">
            <div className="flex-1 min-w=[50%] flex flex-col">
                <h1 className="head-text">Get in Touch</h1>

                <form
                    ref={formRef}
                    onSubmit={handleSubmit} 
                    className="w-full flex flex-col gap-7 mt-14">
                    <label className="text-black-500 font-semibold">
                        Name
                        <input 
                            type="text" 
                            name="name" 
                            className="input" 
                            placeholder="Input your name"
                            required
                            value={form.name} 
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </label>
                    <label className="text-black-500 font-semibold">
                        Email
                        <input 
                            type="email" 
                            name="email" 
                            className="input" 
                            placeholder="input@gmail.com"
                            required
                            value={form.email}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </label>
                    <label className="text-black-500 font-semibold">
                        message
                        <textarea 
                            name="message" 
                            className="input" 
                            placeholder="Say something nice"
                            required
                            value={form.message}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </label>
                    <button
                        type="submit"
                        className="btn"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    >
                        {isLoading ? 'Loading...' : 'Send Message'}
                    </button>
                </form>
            </div>
        </section>
    )
}

export default Contact;