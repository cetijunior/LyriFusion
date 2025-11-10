export default function GlassPanel({
	children,
	className = "",
	as: Tag = "div",
}) {
	return <Tag className={`glass ${className}`}>{children}</Tag>;
}
