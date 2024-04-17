import emailjs from "@emailjs/browser";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";

import Fox from "../models/Fox";
import Loader from "../components/Loader";
import Alert from "../components/Alert";
import useAlert from "../hooks/useAlert";

const Contact = () => {
    const serviceId = import.meta.env.VITE_APP_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY;

    const formRef = useRef(null)
    const [form, setForm] = useState({ name: '', email: '', message: ''})
    const [isLoading, setIsLoading] = useState(false)
    const { alert, showAlert, hideAlert } = useAlert()
    const [currentAnimation, setCurrentAnimation] = useState("idle");
    

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleFocus = () => setCurrentAnimation("walk");
    const handleBlur = () => setCurrentAnimation("idle");

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setCurrentAnimation("hit")
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
            "serviceId",
            templateId,
            {
                from_name: form.name,
                to_name: "Sang Nguyen",
                from_email: form.email,
                to_email: "sang.nguyen.chainstack@gmail.com",
                message: form.message,
            },
        ).then((result) => {
            setIsLoading(false);
            showAlert({
                show: true,
                text: "Thank you for your message 😃",
                type: "success",
            });

          setTimeout(() => {
            hideAlert(false);
            setCurrentAnimation("idle");
            setForm({ name: "", email: "", message: "" });
          }, [3000]);
        }).catch((error) => {
            setIsLoading(false);
            console.error(error);
            setCurrentAnimation("idle");

            showAlert({
                show: true,
                text: "I didn't receive your message 😢",
                type: "danger",
            });
        })
    }

    return (
        <section className="relative flex lg:flex-row flex-col max-container">
            {alert.show && <Alert {...alert}/>}
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

            <div className='lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]'>
                <Canvas
                camera={{
                    position: [0, 0, 5],
                    fov: 75,
                    near: 0.1,
                    far: 1000,
                }}
                >
                <directionalLight position={[0, 0, 1]} intensity={2.5} />
                <ambientLight intensity={1} />
                <pointLight position={[5, 10, 0]} intensity={2} />
                <spotLight
                    position={[10, 10, 10]}
                    angle={0.15}
                    penumbra={1}
                    intensity={2}
                />

                <Suspense fallback={<Loader />}>
                    <Fox
                        currentAnimation={currentAnimation}
                        position={[0.5, 0.35, 0]}
                        rotation={[12.629, -0.6, 0]}
                        scale={[0.5, 0.5, 0.5]}
                    />
                </Suspense>
                </Canvas>
            </div>
        </section>
    )
}

export default Contact;