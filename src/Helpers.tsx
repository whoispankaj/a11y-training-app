import { usePopup, Popup, Button, DeleteButton, Popper, useCloseOnOutsideClick } from "@workday/canvas-kit-react";
import { Placement, useFocusTrap } from "@workday/canvas-kit-react-popup";
import React from "react";

const APopup = (props: React.PropsWithChildren<{heading?: string, placement?: Placement, onClose?: () => void}>) => {
    const {placement, onClose, heading} = props;
    const {targetProps, closePopup, popperProps, stackRef} = usePopup();
    
    const handleClose = () => {
        closePopup();
        onClose?.();
    };
    useCloseOnOutsideClick(stackRef, handleClose);
    useInitialFocus(stackRef, undefined);
    useFocusTrap(stackRef);

    return (
      <Popper placement={placement || 'bottom'} {...popperProps}>
        <Popup
          width={400}
          heading={heading || 'Delete Item'}
          padding={Popup.Padding.s}
          handleClose={handleClose}
        >
            {props.children}
        </Popup>
      </Popper>
    );
};

const useInitialFocus = (
    popupRef: React.RefObject<HTMLElement>,
    firstFocusRef: React.RefObject<HTMLElement> | undefined
  ) => {
    React.useLayoutEffect(() => {
      const handlerRef =
        document.activeElement instanceof HTMLElement ? document.activeElement : null;
      if (popupRef.current) {
        const elem =
          (firstFocusRef && firstFocusRef.current) || getFirstFocusableElement(popupRef.current);
        elem.focus();
      }
      return () => {
        if (handlerRef) {
          handlerRef.focus();
        }
      };
    }, [popupRef, firstFocusRef]);
  };

  export const getFirstFocusableElement = (content: HTMLElement): HTMLElement | null => {
    const elements = content.querySelectorAll('*');
  
    for (let i = 0; i < elements.length; i++) {
      const element = elements.item(i);
      if (element && isElementInteractive(element as HTMLElement)) {
        return element as HTMLElement;
      }
    }
  
    console.log(
      'No focusable element was found. Please ensure popup has at least one focusable element'
    );
    return null;
  };

  /**
 * Determines if a given element is interactive according to:
 * https://html.spec.whatwg.org/dev/dom.html#interactive-content
 * @param element Element that may be interactive (focusable)
 */
export function isElementInteractive(element: HTMLElement): boolean {
    const hidden = element.style.display === 'none' || element.style.visibility === 'hidden';
    const disabled = element.hasAttribute('disabled') && element.getAttribute('disabled') !== 'false';
  
    // If the element is not visible or interactive, fail fast
    if (hidden || disabled) {
      return false;
    }
  
    const hasTabIndex = element.hasAttribute('tabindex');
    const tabIndexNonNegative = Number(element.getAttribute('tabindex')) >= 0;
  
    const tabbableElement = hasTabIndex && tabIndexNonNegative;
    const tabbableNativeElement =
      isTypeOfElementNativelyFocusable(element) && (!hasTabIndex || tabIndexNonNegative);
  
    return tabbableElement || tabbableNativeElement;
  }
  
  function isTypeOfElementNativelyFocusable(element: HTMLElement): boolean {
    const nodeName = element.nodeName.toLowerCase();
    const validInput = nodeName === 'input' && (element as HTMLInputElement).type !== 'hidden';
    const validAnchor = nodeName === 'a' && element.hasAttribute('href');
    const validAudioVideo = ['audio', 'video'].includes(nodeName) && element.hasAttribute('controls');
    const validImgObject = ['img', 'object'].includes(nodeName) && element.hasAttribute('usemap');
    const validNativelyFocusable = [
      'button',
      'details',
      'embed',
      'iframe',
      'select',
      'textarea',
    ].includes(nodeName);
  
    return validInput || validAnchor || validAudioVideo || validImgObject || validNativelyFocusable;
  }