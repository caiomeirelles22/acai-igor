import * as Checkbox from '@radix-ui/react-checkbox'

interface CheckboxProps {
  id: string
  checked: boolean
  onCheckedChange: () => void
  label: string
  price?: string
}

export function CheckboxComponent({
  id,
  checked,
  onCheckedChange,
  label,
  price,
}: CheckboxProps) {
  return (
    <label
      id={id}
      className="flex items-center justify-between p-4 border border-purple-300 rounded-lg cursor-pointer hover:border-purple-400 hover:bg-purple-100 gap-2 "
    >
      <div className="flex items-center space-x-3 w-full">
        <Checkbox.Root
          checked={checked}
          onCheckedChange={onCheckedChange}
          className="w-5 h-5 border border-gray-400 rounded-md flex items-center justify-center"
        >
          <Checkbox.Indicator className="w-3 h-3 bg-purple-700 rounded-sm" />
        </Checkbox.Root>
        <span className="text-purple-700 font-medium">{label}</span>
      </div>
      {price && <span className="text-red-600 font-semibold "> {price}</span>}
    </label>
  )
}
