import { createRef, forwardRef, ForwardRefRenderFunction, useCallback, ChangeEventHandler, ChangeEvent, useState, useEffect } from 'react'
import styled from 'styled-components'
import classNames from 'classnames'

export type CheckStatus = 'checked' | 'unchecked' | 'partial-checked'

export interface CheckboxProps {
    checkStatus?: CheckStatus,
    className?: string,
    onChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void
}

const CheckboxLabel = styled.label`
    width: 1rem;
    height: 1rem;
    position: relative;
    display: inline-block;
    user-select: none;
    cursor: pointer;
    outline: none;

    input {
        opacity: 0;
    }
`

const CustomCheckbox = styled('span') <{ checkStatus: CheckStatus }>`
    border:1px solid;
    border-color: ${(props) => props.checkStatus === 'unchecked' ? '#ccc' : '#3370ff'};
    background-color: ${(props) => props.checkStatus === 'unchecked' ? '#fff' : '#3370ff'};
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    & > svg {
        color: #fff;
    }


    &.change-ani {
        svg {
            animation: showChange .3s ease-in-out;
        }
    }

    @keyframes showChange {
        0% {
            transform: scale(1);
        }

        50% {
            transform: scale(1.2);
        }

        100% {
            transform: scale(1);
        }
    }

`
const CheckSVG = <svg width="12" height="12" fill="none">
    <path
        d="M9.589 2.903l.808.809a.35.35 0 010 .495L5.18 9.425a.35.35 0 01-.495 0l-2.981-2.98a.35.35 0 010-.496l.808-.808a.35.35 0 01.495 0l1.925 1.925 4.163-4.163a.35.35 0 01.495 0z"
        fill="currentColor"
    ></path>
</svg>

const PartialSvg = <svg
    width="12"
    height="12"
    fill="none"
>
    <path
        d="M2 5.4c0-.22.18-.4.4-.4h7.2c.22 0 .4.18.4.4v1.2a.4.4 0 01-.4.4H2.4a.4.4 0 01-.4-.4V5.4z"
        fill="currentColor"
    ></path>
</svg>

const InnerCheckBox: ForwardRefRenderFunction<unknown, CheckboxProps> = (props, ref) => {
    const { checkStatus = "unchecked", className, onChange } = props
    const innerRef = (ref as any) || createRef<HTMLInputElement>()

    const [innerStatus, setInnerStatus] = useState<CheckStatus>(checkStatus)
    const [customCheckboxClass, setCustomCheckboxClass] = useState<string>('')

    const checkChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        const isChecked = e.target.checked
        setInnerStatus(isChecked ? "checked" : "unchecked")
        if (onChange) {
            onChange(isChecked, e)
        }
    }, [])

    useEffect(() => {
        setInnerStatus(checkStatus)
    }, [checkStatus])

    useEffect(() => {
        if (innerStatus === "unchecked") return
        setCustomCheckboxClass(classNames({ 'change-ani': true }))
        const timer = setTimeout(() => {
            setCustomCheckboxClass(classNames({ 'change-ani': false }))
            clearTimeout(timer)
        }, 300)
    }, [innerStatus])

    return <CheckboxLabel className={className}>
        <input type="checkbox" ref={innerRef} onChange={checkChange} />
        <CustomCheckbox className={customCheckboxClass} checkStatus={innerStatus}>
            {innerStatus === "checked" ? CheckSVG : innerStatus === "partial-checked" ? PartialSvg : null}
        </CustomCheckbox >
    </CheckboxLabel >
}

const CheckBox = forwardRef<unknown, CheckboxProps>(InnerCheckBox)

export default CheckBox