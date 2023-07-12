import { signIn } from "next-auth/react";
import {
  useState,
  useCallback,
  useMemo,
  Fragment
} from "react";
import axios from "axios";
import { LoadingDots, Google } from "@/components/shared/icons";
import Image from "next/image";
import { Dialog, Transition } from '@headlessui/react'

const SignInModal = ({
  showSignInModal,
  setShowSignInModal,
}) => {
  const [signInClicked, setSignInClicked] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState({});

  const loginUser = async (credentials) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/auth/users/tokens',
        new URLSearchParams(credentials).toString(), 
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log('An error occurred:', error.response.data);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userName);
    console.log(password);
  
    try {
      const token = await loginUser({"username": userName, "password": password });
      console.log("token:", token);
      localStorage.setItem('token', token.access_token)
      localStorage.getItem('token')

      setToken(token);
  
      if (token) {
        setSignInClicked(true)
        console.log('Logged in successfully!');
      } else {
        console.log('Login failed.');
      }
    } catch (error) {
      console.log('An error occurred:', error);
    }
  };

  return (
    <Transition appear show={showSignInModal} as={Fragment}>
      <Dialog as="div" className="relative z-40" open={showSignInModal} onClose={() => setShowSignInModal(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0">
          <div className="flex min-h-full items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200 transition-all">
                <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
                  <Image
                    src="/hp11.png"
                    alt="Logo"
                    className="h-10 w-10 rounded-full"
                    width={20}
                    height={20}
                  />
                  <h3 className="font-display text-2xl font-bold">Sign In</h3>
                </div>

                <form onSubmit={handleSubmit} className="bg-white">
                  <input
                    type="email"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Email"
                    required
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                  />
                  <button type="submit">Login</button>
                </form>

                
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export function useSignInModal() {
  const [showSignInModal, setShowSignInModal] = useState(false);

  const SignInModalCallback = useCallback(() => {
    return (
      <SignInModal
        showSignInModal={showSignInModal}
        setShowSignInModal={setShowSignInModal}
      />
    );
  }, [showSignInModal, setShowSignInModal]);

  return useMemo(
    () => ({ setShowSignInModal, SignInModal: SignInModalCallback }),
    [setShowSignInModal, SignInModalCallback],
  );
}
