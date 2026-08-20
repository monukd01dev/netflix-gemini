import { Link } from 'react-router'
import InputField from '../InputField'
import PasswordInput from '../PasswordInput'
import { useSignInForm } from '../../hooks/useSignInForm'
import { FORM_PLACEHOLDERS } from '../../utils/constants'
function SignInForm() {
  // 1. Bring in everything from your custom hook
  const {
    handleSubmit,
    formErrors,
    rootFormError,
    isSubmitting,
    emailRef,
    passwordRef
  } = useSignInForm();

  return (
    <div className="w-full z-10 relative">

      <div className="w-full max-w-md mx-auto bg-black/80 p-10 sm:p-14 rounded-md shadow-2xl">
        <h1 className="text-white text-3xl font-bold mb-8 text-left">
          Sign In
        </h1>

        {/* 2. Display Firebase root errors (like wrong password) here */}
        {rootFormError && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 text-sm p-3 rounded-sm mb-6">
            {rootFormError}
          </div>
        )}

        {/* 3. Attach the hook's handleSubmit */}
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <InputField
            type="email"
            name="email"
            id="signin-email"
            placeholder={FORM_PLACEHOLDERS.EMAIL}
            ref={emailRef} // 4. Attach the hook's ref
            error={formErrors.email?.[0]} // 5. Map the error
          />

          <PasswordInput
            name="password"
            id="signin-password"
            placeholder={FORM_PLACEHOLDERS.PASSWORD}
            ref={passwordRef}
            error={formErrors.password?.[0]}
          />

          {/* 6. Disable the button and change text while submitting */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 mt-4 flex items-center justify-center text-white font-bold bg-red-600 rounded-sm transition-all duration-200 cursor-pointer hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                {/* Tailwind SVG Spinner */}
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="mt-10 text-zinc-400 text-sm">
          <p>
            New to Netflix Gemini?{' '}
            <Link to='/signup' className="text-white hover:underline cursor-pointer">
              Sign up now.
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignInForm;