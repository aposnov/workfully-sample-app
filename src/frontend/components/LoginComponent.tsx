import React, { useState } from 'react';
import { Container, Form, Button, ButtonGroup } from 'react-bootstrap';

interface LoginForm {
    email: string;
    password: string;
}

interface ProfileProps {
    showRegistration: () => void;
    showProfile: () => void;
}

const Login: React.FC<ProfileProps> = ({ showRegistration, showProfile }) => {
    const [loginData, setLoginData] = useState<LoginForm>({
        email: '',
        password: '',
    });

    const handleShowReg = () => {
        showRegistration();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                showProfile()
            } else {
                const errorData = await response.json();
                console.error('Login error:', errorData.error);
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <Container>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={loginData.email}
                        onChange={handleChange}
                        required
                        placeholder="name@example.com"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={loginData.password}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <ButtonGroup aria-label="Basic example">
                    <Button type="submit" variant="primary">
                        Login
                    </Button>
                    <Button variant="secondary" onClick={handleShowReg}>
                        Registration
                    </Button>
                </ButtonGroup>
            </Form>
        </Container>
    );
};

export default Login;