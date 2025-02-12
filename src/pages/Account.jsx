import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { HiOutlineArrowRight } from 'react-icons/hi'
import styled from 'styled-components'

import GoogleIcon from '../components/GoogleIcon'
import ReusableNav from '../components/ui/ReusableNav'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const UseMain = styled.main` 
    display: grid;
    gap: 1.2rem;
    background-image: repeating-radial-gradient(  #0c0a0a 80%,#2f312f 90%,#3f4549 90%);
    background-size: 65px 65px;
`

const Data = styled.form` 
    display: grid;
    gap: 1rem;
    margin-top: 3rem;
`

const Photo = styled.div` 
    display: grid;
    gap: 1.2rem;
    margin-bottom: 1.2rem;
    background-image: repeating-radial-gradient(  #0c0a0a 80%,#2f312f 90%,#3f4549 90%);
    background-size: 65px 65px;
    
    & .use__photo {
        width: 7rem;
        height: 7rem;
        margin: -2rem auto 0;
        border-radius: 50%;
        object-fit: cover;
    }
    
    & div {
        text-align: center;
        display: grid;

        & h1 {
            color: white;
            font-size: 1.5rem;
            font-weight: 500;
        }

        & p {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            color: gray;
            margin-top: -0.2rem;
        }
    }

    & input {
        display: none;
    }
`

const DataShadow = styled.div`
    display: grid;
    gap: 3rem;
    padding: 18% 8% 0;
    background-color: white;
    border-radius: 2rem 2rem 0 0;
    box-shadow: 0px -4px 14px #ffffff1a;
`

const InputPhoto = styled.label` 
    text-align: center;
    margin: auto;
    background-color: white;
    color: #152126;
    border: none;
    font-family: inherit;
    padding: 0.5rem 1.5em;
    border-radius: 2rem;
    cursor: pointer;
    font-size: 0.9rem;
    font-family: inherit;
    font-weight: 500;
    transition: all .2s ease-in-out;
    box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);

    &:active {
        box-shadow: none;
    }
`

const Button = styled.button`
    text-align: center;
    margin: -1rem auto 3rem;
    background-color: #152126;
    color: white;
    border: none;
    font-family: inherit;
    padding: 0.5rem 3em;
    border-radius: 2rem;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all .2s ease-in-out;
    box-shadow: 4px 8px 19px -3px rgba(0, 0, 0, 0.27);

    &:active {
        box-shadow: none;
    }
`

const Error = styled.span`
    color: red;
    font-size: 0.8rem;
    text-align: ${(props) => props.type === 'center' ? 'center' : ''};
    margin-top: ${(props) => props.type === 'center' ? '-0.5rem' : ''};
`

export default function Account() {
    const [image, setImage] = useState("")

    useEffect(() => {
        const savedImage = localStorage.getItem("storedImage")
        if (savedImage) {
            setImage(savedImage)
        }
    }, [])

    const {
        selectCurrency,
        setSelectCurrency
    } = useAppContext()
    const storedValues = JSON.parse(localStorage.getItem("formValues")) || {}
    const random = Math.floor(Math.random() * (0 - 26500 + 1)) + 1
    const avatarUrl = `https://api.dicebear.com/7.x/lorelei/svg?seed=${random}`

    const handleImageChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImage(reader.result)
                localStorage.setItem("storedImage", reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm({
        defaultValues: storedValues
    })

    const [setFormValues] = useState({
        name: "",
        email: "",
        number: ""
    })

    useEffect(() => {
        localStorage.setItem("formValues", JSON.stringify(getValues()))
    }, [getValues])

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormValues((prev) => ({ ...prev, [name]: value }))
        setValue(name, value)
    }


    const onSubmit = (data) => {
        const values = getValues()
        localStorage.setItem("formValues", JSON.stringify(values))
        toast.success("Updated data successfully")
    }

    return (
        <>
            <UseMain>
                <ReusableNav textColor='white'>
                    <h3>Account</h3>
                    <Link to="/">
                        <HiOutlineArrowRight />
                    </Link>
                </ReusableNav>

                <Data onSubmit={handleSubmit(onSubmit)}>
                    <Photo>
                        <img
                            className='use__photo'
                            src={!image ? avatarUrl : image}
                            alt='User Pic'
                            width={100}
                            height={100}
                            unoptimized
                        />

                        <div>
                            {storedValues.name && <h1>{storedValues.name}</h1>}
                            {storedValues.email && (
                                <p>
                                    <GoogleIcon />
                                    {storedValues.email}
                                </p>
                            )}
                        </div>

                        <InputPhoto htmlFor="userPhoto" className="upload-photo btn">
                            {!image ? 'Adicionar foto' : 'Alterar foto'}
                        </InputPhoto>

                        <input
                            type="file"
                            id='userPhoto'
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </Photo>

                    <DataShadow>
                        <div className="inputContainer">
                            <input
                                id="inputField"
                                type="text"
                                name="name"
                                onChange={handleInputChange}
                                placeholder="Name"
                                autoComplete="name"
                                {...register("name", { required: "This field is required" })}
                            />
                            {errors.name && <Error>{errors.name.message}</Error>}
                            <label className="usernameLabel" htmlFor="inputField">
                                Name
                            </label>
                            <svg
                                viewBox="0 0 448 512"
                                className="userIcon"
                            >
                                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path>
                            </svg>
                        </div>
                        <div className="inputContainer">
                            <input
                                id="inputField"
                                type="email"
                                name="email"
                                onChange={handleInputChange}
                                placeholder="Email"
                                autoComplete="email"
                                {...register("email", { required: "This field is required" })}
                            />
                            {errors.email && <Error>{errors.email.message}</Error>}
                            <label className="usernameLabel" htmlFor="inputField">
                                Email
                            </label>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="userOther"
                            >
                                <path fillRule="evenodd" d="M5.478 5.559A1.5 1.5 0 0 1 6.912 4.5H9A.75.75 0 0 0 9 3H6.912a3 3 0 0 0-2.868 2.118l-2.411 7.838a3 3 0 0 0-.133.882V18a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0 0 17.088 3H15a.75.75 0 0 0 0 1.5h2.088a1.5 1.5 0 0 1 1.434 1.059l2.213 7.191H17.89a3 3 0 0 0-2.684 1.658l-.256.513a1.5 1.5 0 0 1-1.342.829h-3.218a1.5 1.5 0 0 1-1.342-.83l-.256-.512a3 3 0 0 0-2.684-1.658H3.265l2.213-7.191Z" clipRule="evenodd" />
                                <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v6.44l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 0 1 1.06-1.06l1.72 1.72V3a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="inputContainer">
                            <input
                                id="inputField"
                                type="number"
                                name="number"
                                onChange={handleInputChange}
                                placeholder="Phone Number"
                                autoComplete="tel-local"
                                {...register("number", { required: "This field is required" })}
                            />
                            {errors.number && <Error>{errors.number.message}</Error>}
                            <label className="usernameLabel" htmlFor="inputField">
                                Phone Number
                            </label>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="userIcon"
                            >
                                <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="inputContainer">
                            <select
                                id="inputField"
                                value={selectCurrency}
                                onChange={(e) => setSelectCurrency(e.target.value)}
                            >
                                <option value="AOA">Angolan Kwanza (AOA)</option>
                                <option value="CAD">Canadian dollar (CAD)</option>
                                <option value="EUR">Euro (EUR)</option>
                                <option value="GBP">Libra Esterlina (GBP)</option>
                                <option value="BRL">Real Brasileiro (BRL)</option>
                                <option value="USD">US Dollar (USD)</option>
                            </select>
                            <label className="usernameLabel" htmlFor="inputField">
                                Currency
                            </label>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="userOther"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                            </svg>
                        </div>

                        <Button type='submit'>Save</Button>
                    </DataShadow>
                </Data>
            </UseMain>
        </>
    )
}
