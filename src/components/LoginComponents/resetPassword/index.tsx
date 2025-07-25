import {
    Button,
    Center,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Heading,
    Image,
    Input,
    VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Alert } from '~/components/alert';
import { Loader } from '~/components/loader';
import { errorResetPasswordMessage } from '~/constants/LoginTextModals/errorTextModals';
import { TEST_IDS } from '~/constants/testsIds';
import {
    LoginInputStyles,
    loginModalContentStyles,
    LoginModalHeader,
    loginModalWrapperStyles,
} from '~/Pages/Login/styles';
import { useResetPasswordMutation } from '~/query/services/post/regLog';
import { ResetPasswordType } from '~/types/LoginTypes';
import { resetPasswordSchema } from '~/utils/validationRules/yupSheme';

import closeBtn from '../../../assets/verificationCloseImg.svg';
import { PasswordInput } from '../LoginTabs/passwordInput';

export const ResetPasswordModal = ({
    isOpen,
    onClose,
    email,
}: {
    isOpen: boolean;
    onClose: () => void;
    email: string;
}) => {
    const [resetPassword, { isSuccess, isLoading, isError, error }] = useResetPasswordMutation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordType>({
        mode: 'onChange',
        resolver: yupResolver(resetPasswordSchema),
    });
    if (isSuccess) {
        return <Alert isSuccessCheck successMessage='Восстановление данных успешно' />;
    }
    const onSubmit: SubmitHandler<ResetPasswordType> = (data) => {
        data.email = email;
        resetPassword(data);
    };

    return isOpen ? (
        <Center {...loginModalWrapperStyles}>
            <VStack
                w={{ lg: '396px', base: '316px' }}
                {...loginModalContentStyles}
                data-test-id={TEST_IDS.RESET_CREDENTIALS_MODAL}
            >
                <Heading {...LoginModalHeader}>
                    Восстановление <br /> аккаунта
                </Heading>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <VStack gap='24px'>
                        <FormControl isInvalid={!!errors.login}>
                            <FormLabel>Логин для входа на сайт</FormLabel>
                            <Input
                                data-test-id={TEST_IDS.LOGIN_INPUT}
                                {...LoginInputStyles}
                                {...register('login')}
                                placeholder='Введите Логин'
                                borderColor={isError ? 'red' : '#d7ff94'}
                            />
                            <FormHelperText>
                                Логин не менее 5 символов, только латиница
                            </FormHelperText>
                            <FormErrorMessage>
                                {errors.login && errors.login.message}
                            </FormErrorMessage>
                        </FormControl>
                        <PasswordInput
                            test={TEST_IDS.PASSWORD}
                            errors={errors.password}
                            {...register('password')}
                        />
                        <PasswordInput
                            test={TEST_IDS.CONFIRM_PASSWORD}
                            errors={errors.passwordConfirm}
                            repeat
                            {...register('passwordConfirm')}
                        />
                        <Button
                            data-test-id={TEST_IDS.SUBMIT_BTN}
                            type='submit'
                            variant='commonLoginBtn'
                        >
                            Получить код
                        </Button>
                    </VStack>
                </form>
                <Image
                    data-test-id={TEST_IDS.CLOSE_BTN}
                    position='absolute'
                    right='24px'
                    src={closeBtn}
                    alt='close img'
                    onClick={onClose}
                />
            </VStack>
            {isLoading && <Loader />}
            {isError && (
                <Alert
                    error={error.data.message}
                    errorStatus={error.status}
                    errorMessage={errorResetPasswordMessage}
                />
            )}
        </Center>
    ) : null;
};
