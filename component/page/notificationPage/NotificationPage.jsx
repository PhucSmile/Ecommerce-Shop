import Breadcrumb from '@/component/breadcrumbs/Breadcrumb';
import { Container } from '@/component/common';
import Goback from '@/component/goBack/Goback';
import InputSwitch from '@/component/input/InputSwitch';
import React, { useMemo, useState } from 'react';

const path = {
    pathOne: 'Home',
    pathTwo: 'Settings',
    pathThree: 'Notification',
};

const NotificationPage = () => {
    const [enabledEmail, setEnabledEmail] = useState(false);
    const [enabledSMS, setEnabledEmailSMS] = useState(false);
    const [enabledNotication, setEnabledNotication] = useState(false);

    const [enabledEmailPrompt, setEnabledEmailPrompt] = useState(false);
    const [enabledSMSPrompt, setEnabledEmailSMSPrompt] = useState(false);
    const [enabledNoticationPrompt, setEnabledNoticationPrompt] = useState(false);

    // submit
    const reqApi = useMemo(async () => {
        const data = {
            Email: enabledEmail,
            SMS: enabledSMS,
            Notication: enabledNotication,
            EmailPrompt: enabledEmailPrompt,
            SMSPrompt: enabledSMSPrompt,
            NoticationPrompt: enabledNoticationPrompt,
        };
        console.log('submit', data);
        // chưa có API POST
    }, [enabledEmail, enabledSMS, enabledNotication, enabledEmailPrompt, enabledSMSPrompt, enabledNoticationPrompt]);
    return (
        <>
            <Container>
                {/* Breadcrumb */}
                <div className="mt-11 mb-5 lg:mt-[78px] lg:mb-[42px]">
                    <Breadcrumb path={path} />
                </div>
                <Goback title="Notification" />
                <div className="mt-[14px]">
                    <h4 className="text-[#000000] font-semibold">Updates and offers</h4>
                    <p className="pt-1 w-[343px] text-sm">
                        Be the first to receive information about new programs, codes, discounts and features from
                        E-Commerce
                    </p>
                </div>

                <div className="mt-8 mb-5">
                    <InputSwitch enabled={enabledEmail} setEnabled={setEnabledEmail} title="email" />
                    <InputSwitch enabled={enabledSMS} setEnabled={setEnabledEmailSMS} title="SMS" />
                    <InputSwitch
                        enabled={enabledNotication}
                        setEnabled={setEnabledNotication}
                        title="Notication"
                        desc="Please agree to receive notifications when asked"
                    />
                </div>

                <div className="mt-[55px]">
                    <h4 className="text-[#000000] font-semibold">Remindful</h4>
                    <p className="pt-1 w-[343px] text-sm">
                        Important notifications like orders, payments, reviews, complaints.
                    </p>
                </div>
                <div className="mt-8 mb-[111px]">
                    <InputSwitch enabled={enabledEmailPrompt} setEnabled={setEnabledEmailPrompt} title="email" />
                    <InputSwitch enabled={enabledSMSPrompt} setEnabled={setEnabledEmailSMSPrompt} title="SMS" />
                    <InputSwitch
                        enabled={enabledNoticationPrompt}
                        setEnabled={setEnabledNoticationPrompt}
                        title="Notification"
                        desc="Please agree to receive notifications when asked"
                    />
                </div>
            </Container>
        </>
    );
};

export default NotificationPage;
