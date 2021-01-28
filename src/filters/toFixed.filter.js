export default function(value) {
	if (!value) return '';
	value = +value;
	return value.toFixed(2);
}
