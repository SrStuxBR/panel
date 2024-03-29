import styled from 'styled-components/macro';
import tw, { theme } from 'twin.macro';

const SubNavigation = styled.div`
    ${tw`w-full bg-neutral-700 shadow rounded-lg mt-6 box-border px-2 pt-4 mb-0`};
    border-bottom:3px solid var(--900);

    & > .aboutServer {
        ${tw`mb-4 w-full overflow-x-auto flex items-center text-sm mx-auto px-2`};
        max-width: 1200px;
    }

    & > .links {
        ${tw`w-full overflow-x-auto flex items-center text-sm mx-auto px-2`};
        max-width: 1200px;

        & > a,
        & > div {
            ${tw`inline-block pb-3 text-neutral-300 no-underline whitespace-nowrap transition-all duration-150 mr-3`};

            &:not(:first-of-type) {
                ${tw`ml-2`};
            }

            &:hover {
                ${tw`text-neutral-100`};
            }

            &:active,
            &.active {
                ${tw`text-neutral-100`};
                box-shadow: inset 0 -2px #565656;
            }
        }
    }
`;

export default SubNavigation;
