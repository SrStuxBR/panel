import styled from 'styled-components/macro';
import tw from 'twin.macro';

export default styled.div<{ $hoverable?: boolean }>`
    ${tw`flex rounded-lg no-underline text-neutral-200 items-center bg-neutral-700 p-4 border border-transparent transition-colors duration-150 overflow-hidden`};

    & .icon {
        ${tw`rounded-full w-16 flex items-center justify-center bg-neutral-500 p-3`};
    }

    & textarea {
        background:var(--800) !important;
        outline:none !important;
        box-shadow:none !important;
        border:none !important;
    }
    & label {
        background:transparent !important;
    }
    & select, input {
        background:var(--800) !important;
    }
`;
