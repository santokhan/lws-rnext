import React, { useRef, useEffect, useState } from 'react';

const IntersectionObserverComponent = ({ threshold = 0.5, rootMargin = '0px', onIntersection }) => {
    const targetRef = useRef(null);
    const [observer, setObserver] = useState(null);

    useEffect(() => {
        if (!window.IntersectionObserver) return;

        const observerInstance = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                onIntersection(entry);
            }
        }, {
            root: null,
            rootMargin,
            threshold
        });

        setObserver(observerInstance);

        return () => {
            if (observerInstance) {
                observerInstance.disconnect();
            }
        };
    }, [onIntersection, rootMargin, threshold]);

    useEffect(() => {
        if (observer && targetRef.current) {
            observer.observe(targetRef.current);

            // return () => {
            //     observer.unobserve(targetRef.current);
            // };
        }
    }, [observer]);

    return <div ref={targetRef}></div>;
};

export default IntersectionObserverComponent;
