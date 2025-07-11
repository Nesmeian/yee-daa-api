import { Avatar, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Loader } from '~/components/loader';
import { IMG_PATH } from '~/shared/config/api';
import { SpinnerOverlay } from '~/shared/ui/SpinerOverlay';
import AddNotifications from '~/utils/addNotifications';

import { useGetBlogByIdQuery } from '../../model/slice';
import { FollowBtn } from './followBtn';
export const BlogUserCard = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetBlogByIdQuery(id || '');
    const [isToggleLoading, setIsToggleLoading] = useState(false);
    if (isLoading) {
        return <Loader />;
    }

    const { firstName, photoLink, login } = data!.bloggerInfo;
    const { isFavorite } = data!;
    return (
        <HStack mt='16px' position='relative' gap='24px'>
            <Avatar size='2xl' name={firstName} src={`${IMG_PATH}${photoLink}`} />
            <VStack alignItems='flex-start'>
                <Heading as='h1' size='h1'>
                    {firstName}
                </Heading>
                <Text color='rgba(0, 0, 0, 0.64)'> {`@${login}`}</Text>
                <HStack justify='space-between' w='100%'>
                    <FollowBtn
                        setIsToggleLoading={setIsToggleLoading}
                        isFavorite={isFavorite}
                        userId={id!}
                    />
                    <AddNotifications
                        bookmarks={data?.totalBookmarks}
                        subscribes={data?.totalSubscribers}
                    />
                </HStack>
            </VStack>
            {isToggleLoading && <SpinnerOverlay />}
        </HStack>
    );
};
