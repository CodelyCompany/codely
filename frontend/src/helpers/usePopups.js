import { useEffect } from 'react';

import { removePopup } from 'ducks/popups/actions';
import { getPopups } from 'ducks/popups/selectors';
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

let displayed = [];

const usePopups = () => {

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const popups = useSelector(getPopups);

    const storeDisplayed = (id) => {
        displayed = [...displayed, id];
    };

    const removeDisplayed = (id) => {
        displayed = [...displayed.filter((key) => id !== key)];
    };

    useEffect(() => {

        popups.forEach(({ key, messageKey, options = {}, dismissed = false }) => {

            if (dismissed) return closeSnackbar(key);
            if (displayed.includes(key)) return;

            enqueueSnackbar(t(messageKey), {
                key,
                ...options,
                onExited: (_, key) => {
                    dispatch(removePopup(key));
                    removeDisplayed(key);
                },
            });

            storeDisplayed(key);
        });
    }, [popups]);
};

export default usePopups;