import clsx from 'clsx';

export function Container({ className, ...props }) {
    return <div className={clsx('px-3 mx-auto max-w-[1354px]', className)} {...props} />;
}
