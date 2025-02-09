"use client"
import ReusableNav from '@/src/components/ui/ReusableNav'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { HiOutlineArrowRight } from 'react-icons/hi'
import styled from 'styled-components'

const UseMain = styled.main` 
    display: grid;
    gap: 1.2rem;
    padding: 0 5%;
`

const Photo = styled.div` 
    display: grid;
    gap: 1.2rem;

    & .use__photo {
        background-color: gray;
        width: 9rem;
        height: 9rem;
        margin: 2rem auto 0;
        border-radius: 50%;
        object-fit: cover;
    }

    & input {
        display: none;
    }
`

const InputPhoto = styled.label` 
    width: 40%;
    text-align: center;
    margin: auto;
    background-color: #152126;
    color: white;
    border: none;
    font-family: inherit;
    padding: 0.7rem;
    border-radius: 2rem;
    cursor: pointer;
    font-size: 0.9rem;
    font-family: inherit;
`

const Data = styled.div` 
    display: grid;
    gap: 3rem;
    margin-top: 3rem;
`

export default function Page() {
    const [image, setImage] = useState(null)

    const handleImageChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImage(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <>
            <ReusableNav textColor='black'>
                <h3>Account</h3>
                <Link href="/"><HiOutlineArrowRight /></Link>
            </ReusableNav>

            <UseMain>
                <Photo>
                    <Image className='use__photo' src={!image ? '/use-profile.png' : image} alt='User Pic' width={100} height={100} />

                    <InputPhoto htmlFor="userPhoto" className="upload-photo btn">
                        {!image ? 'Adicionar foto' : 'Alterar foto'}
                    </InputPhoto>
                    <input type="file" id='userPhoto' accept="image/*" onChange={handleImageChange} />
                </Photo>

                <Data>
                    <div className="inputContainer">
                        <input required="required" id="inputField" placeholder="Username" type="text" />

                        <label className="usernameLabel" for="inputField">Full Name</label>
                        <svg viewBox="0 0 448 512" class="userIcon"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path></svg>
                    </div>

                    <div className="inputContainer">
                        <input required="required" id="inputField" placeholder="Email" type="text" />

                        <label className="usernameLabel" for="inputField">Email</label>
                        <svg viewBox="0 0 448 512" class="userIcon"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path></svg>
                    </div>

                    <div className="inputContainer">
                        <input required="required" id="inputField" placeholder="Phone Number" type="text" />

                        <label className="usernameLabel" for="inputField">Phone Number</label>
                        <svg viewBox="0 0 448 512" class="userIcon"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path></svg>
                    </div>

                    <div className="inputContainer">
                        <select required="required" id="inputField" value="" type="text">
                            <option></option>
                            <option>English</option>
                            <option>Portuguese</option>
                        </select>

                        <label className="usernameLabel" for="inputField">Language</label>
                        <svg viewBox="0 0 448 512" class="userIcon"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"></path></svg>
                    </div>
                </Data>
            </UseMain>
        </>
    )
}
