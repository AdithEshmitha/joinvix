const Title = ({ title, subtitle }) => {
    return (
        <div className="flex flex-col gap-2 py-8">
            <h1 className="text-2xl md:text-3xl text-text font-bold">{title}</h1>
            <span className="text-text/60 tracking-wide">{subtitle}</span>
        </div>
    )
}

export default Title
