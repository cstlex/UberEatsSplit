import React from 'react'
import Add from 'Assets/Images/add.svg'
import Clear from 'Assets/Images/clear.svg'
import CurrencyInput from 'react-currency-input-field'
import { timeout } from 'Utils'

const DEFAULT_TAX_RATE = 13

type User = {
    name: string
    menu: string
    price: number
}
type Fees = {
    allServiceFees: number
    tip: number
    isTipAbsolute: boolean
    preTaxDiscount: number
    postTaxDiscount: number
    taxRate: number
}

function toFloat(value: string) {
    const float = parseFloat(value)
    if (isNaN(float)) {
        return 0.0
    } else {
        return float
    }
}
function formatMoney(value: number, fixed?: number) {
    const float = toFloat(value.toFixed(fixed ?? 2))
    return '$' + float.toLocaleString()
}
function moneyToValue(money: string | undefined): number {
    if (!money) {
        return 0.0
    }
    const value = parseFloat(
        money.replace(/(?!\.)\D/g, '').replace(/(?!^0$)^0+/g, ''),
    )
    if (isNaN(value)) {
        return 0.0
    }
    return value
}

function userTotal(user: User, fees: Fees, totalUsers: number) {
    return (
        (user.price +
            fees.allServiceFees / totalUsers -
            fees.preTaxDiscount / totalUsers) *
            (1 + fees.taxRate / 100.0) +
        fees.tip / totalUsers -
        fees.postTaxDiscount / totalUsers
    )
}

const emptyUser: User = {
    name: '',
    menu: '',
    price: 0,
}

export default function App() {
    const [title, setTitle] = React.useState('UberEats Bill Split')
    const [reloading, setReloading] = React.useState(false)
    const [users, setUsers] = React.useState<User[]>([emptyUser])
    const [fees, setFees] = React.useState<Fees>({
        allServiceFees: 0,
        preTaxDiscount: 0,
        postTaxDiscount: 0,
        tip: 0,
        isTipAbsolute: true,
        taxRate: DEFAULT_TAX_RATE,
    })

    const isTipAbsolute = fees.isTipAbsolute
    const setTipAbsolute = (absolute: boolean) => {
        setFees({
            ...fees,
            isTipAbsolute: absolute,
        })
    }

    const clearUser = async () => {
        setFees({
            allServiceFees: 0,
            preTaxDiscount: 0,
            postTaxDiscount: 0,
            tip: 0,
            isTipAbsolute: true,
            taxRate: DEFAULT_TAX_RATE,
        })
        setUsers([emptyUser])
        setReloading(true)
        await timeout(100)
        setReloading(false)
    }
    const addUser = () => {
        setUsers([...users, emptyUser])
    }
    const removeUser = (index: number) => {
        setUsers(users.filter((u, i) => i !== index))
    }

    const onUserChange = (user: Partial<User>, index: number) => {
        setUsers(users.map((u, i) => (i === index ? { ...u, ...user } : u)))
    }
    const onFeesChange = (f: Partial<Fees>) => {
        setFees({
            ...fees,
            ...f,
        })
    }
    const menuTotal = users
        .map((u) => u.price)
        .reduce((total, price) => total + price)
    const tax =
        (menuTotal + fees.allServiceFees - fees.preTaxDiscount) *
        (fees.taxRate / 100.0)
    const totalTip = isTipAbsolute
        ? fees.tip
        : (menuTotal +
              fees.allServiceFees +
              tax -
              fees.postTaxDiscount -
              fees.preTaxDiscount) *
          (fees.tip / 100.0)

    return (
        <div className="w-screen h-screen p-5 flex flex-1 flex-col bg-white dark:bg-black">
            <div className="flex-1 flex flex-col flex-grow overflow-scroll pb-24">
                <input
                    className="font-medium text-xl text-black dark:text-white bg-white dark:bg-black"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <table className="w-full mt-3 border-separate table-fixed">
                    <thead className="bg-blue-thead dark:bg-gray-35 text-black dark:text-white">
                        <tr>
                            <th>Name</th>
                            <th className="hidden sm:table-cell">Menu</th>
                            <th>Price</th>
                            <th className="hidden sm:table-cell">Fee</th>
                            <th className="hidden sm:table-cell">Tax</th>
                            <th className="hidden sm:table-cell">Tip</th>
                            <th className="hidden sm:table-cell">Discount</th>
                            <th>Total</th>
                            <th>Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, i) => (
                            <tr
                                key={`${i}-${users.length}`}
                                className={
                                    i % 2 === 0
                                        ? 'bg-white dark:bg-black'
                                        : 'bg-blue-tbody dark:bg-gray-900'
                                }
                            >
                                <td>
                                    <input
                                        className="w-full bg-transparent text-black dark:text-white"
                                        value={user.name}
                                        placeholder="Name"
                                        onChange={(e) =>
                                            onUserChange(
                                                { name: e.target.value },
                                                i,
                                            )
                                        }
                                    />
                                </td>
                                <td className="hidden sm:table-cell">
                                    <input
                                        className="w-full bg-transparent text-black dark:text-white"
                                        value={user.menu}
                                        placeholder="Menu"
                                        onChange={(e) =>
                                            onUserChange(
                                                { menu: e.target.value },
                                                i,
                                            )
                                        }
                                    />
                                </td>
                                <td>
                                    <CurrencyInput
                                        className="w-full bg-transparent text-black dark:text-white"
                                        prefix="$"
                                        defaultValue={user.price}
                                        placeholder="Price"
                                        decimalsLimit={5}
                                        onValueChange={(value) =>
                                            onUserChange(
                                                { price: moneyToValue(value) },
                                                i,
                                            )
                                        }
                                    />
                                </td>
                                <td className="bg-gray-200 hidden sm:table-cell text-black dark:bg-gray-700 dark:text-white">
                                    {formatMoney(
                                        fees.allServiceFees / users.length,
                                        5,
                                    )}
                                </td>
                                <td className="bg-gray-200 hidden sm:table-cell text-black dark:bg-gray-700 dark:text-white">
                                    {formatMoney(
                                        (user.price +
                                            fees.allServiceFees / users.length -
                                            fees.preTaxDiscount /
                                                users.length) *
                                            (fees.taxRate / 100.0),
                                        5,
                                    )}
                                </td>
                                <td className="bg-gray-200 hidden sm:table-cell text-black dark:bg-gray-700 dark:text-white">
                                    {formatMoney(totalTip / users.length)}
                                </td>
                                <td className="bg-gray-200 hidden sm:table-cell text-black dark:bg-gray-700 dark:text-white">
                                    {formatMoney(
                                        fees.postTaxDiscount / users.length +
                                            fees.preTaxDiscount / users.length,
                                    )}
                                </td>
                                <td className="bg-gray-200 text-black dark:bg-gray-700 dark:text-white">
                                    {formatMoney(
                                        (user.price +
                                            fees.allServiceFees / users.length -
                                            fees.preTaxDiscount /
                                                users.length) *
                                            (1 + fees.taxRate / 100.0) +
                                            fees.tip / users.length -
                                            fees.postTaxDiscount / users.length,
                                    )}
                                </td>
                                <td>
                                    {users.length > 1 && (
                                        <button
                                            className="text-base bg-gray-35 h-7 w-20 text-center text-white rounded my-auto mx-auto md:ml-2 mt-2 md:mt-0 mb-2 md:mb-0"
                                            onClick={() => removeUser(i)}
                                        >
                                            Delete
                                        </button>
                                    )}
                                    {users.length <= 1 && (
                                        <div className="h-7 w-20 my-auto mx-auto md:ml-2 mt-2 md:mt-0 mb-2 md:mb-0" />
                                    )}
                                </td>
                            </tr>
                        ))}
                        <tr className="bg-gray-300 text-black dark:bg-gray-700 text-black dark:text-white">
                            <td>Subtotal</td>
                            <td className="hidden sm:table-cell" />
                            <td>{formatMoney(menuTotal)}</td>
                            <td className="hidden sm:table-cell">
                                {formatMoney(fees.allServiceFees)}
                            </td>
                            <td className="hidden sm:table-cell">
                                {formatMoney(tax)}
                            </td>
                            <td className="hidden sm:table-cell">
                                {formatMoney(totalTip)}
                            </td>
                            <td className="hidden sm:table-cell">
                                {formatMoney(
                                    fees.postTaxDiscount + fees.preTaxDiscount,
                                )}
                            </td>
                            <td>
                                {formatMoney(
                                    users
                                        .map((u) =>
                                            userTotal(u, fees, users.length),
                                        )
                                        .reduce((p, n) => p + n),
                                )}
                            </td>
                            <td />
                        </tr>
                    </tbody>
                </table>

                <table className="w-full sm:w-2/3 table-fixed mt-3 mb-4">
                    <tbody className="bg-gray-200 text-black dark:bg-gray-700 dark:text-white">
                        <tr>
                            <td className="hidden sm:table-cell">
                                All Fees (Service fee, Delivery fee, ... etc)
                            </td>
                            <td className="sm:hidden">Fees</td>
                            <td>
                                <CurrencyInput
                                    key={`${reloading}`}
                                    className="w-full bg-white dark:bg-black"
                                    prefix="$"
                                    defaultValue={fees.allServiceFees}
                                    placeholder="Fees"
                                    decimalsLimit={5}
                                    onValueChange={(value) =>
                                        onFeesChange({
                                            allServiceFees: moneyToValue(value),
                                        })
                                    }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="flex flex-row">
                                Tip
                                <div className="ml-auto mr-3 flex-col sm:flex-row">
                                    <label className="inline-flex items-center ml-2 sm:ml-0">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox h-3 w-3 text-blue-600"
                                            checked={!isTipAbsolute}
                                            onChange={() =>
                                                setTipAbsolute(false)
                                            }
                                        />
                                        <span className="ml-1 text-gray-700 dark:text-white">
                                            Percent
                                        </span>
                                    </label>
                                    <label className="inline-flex items-center ml-2">
                                        <input
                                            type="checkbox"
                                            className="form-checkbox h-3 w-3 text-blue-600"
                                            checked={isTipAbsolute}
                                            onChange={() =>
                                                setTipAbsolute(true)
                                            }
                                        />
                                        <span className="ml-1 text-gray-700 dark:text-white">
                                            Absolute
                                        </span>
                                    </label>
                                </div>
                            </td>
                            <td>
                                <CurrencyInput
                                    key={`${isTipAbsolute}${reloading}`}
                                    className="w-full bg-white dark:bg-black"
                                    prefix={isTipAbsolute ? '$' : ''}
                                    defaultValue={fees.tip}
                                    placeholder="Tip"
                                    decimalsLimit={5}
                                    onValueChange={(value) =>
                                        onFeesChange({
                                            tip: moneyToValue(value),
                                        })
                                    }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className="flex flex-row">
                                Tax
                                <div className="ml-auto mr-3 flex-row">
                                    <CurrencyInput
                                        key={`${reloading}`}
                                        className="bg-white w-20 ml-3 text-right pr-1 dark:bg-black dark:text-white"
                                        defaultValue={fees.taxRate}
                                        placeholder="Tax"
                                        decimalsLimit={5}
                                        onValueChange={(value) =>
                                            onFeesChange({
                                                taxRate: moneyToValue(value),
                                            })
                                        }
                                    />
                                    %
                                </div>
                            </td>
                            <td>{formatMoney(tax)}</td>
                        </tr>
                        <tr>
                            <td>Pre Tax Discount</td>
                            <td>
                                <CurrencyInput
                                    key={`${reloading}`}
                                    className="w-full bg-white dark:bg-black dark:text-white"
                                    prefix="$"
                                    defaultValue={fees.postTaxDiscount}
                                    placeholder="Pre Tax Discount"
                                    decimalsLimit={5}
                                    onValueChange={(value) =>
                                        onFeesChange({
                                            preTaxDiscount: moneyToValue(value),
                                        })
                                    }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Post Tax Discount</td>
                            <td>
                                <CurrencyInput
                                    key={`${reloading}`}
                                    className="w-full bg-white dark:bg-black dark:text-white"
                                    prefix="$"
                                    defaultValue={fees.postTaxDiscount}
                                    placeholder="Post Tax Discount"
                                    decimalsLimit={5}
                                    onValueChange={(value) =>
                                        onFeesChange({
                                            postTaxDiscount:
                                                moneyToValue(value),
                                        })
                                    }
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="absolute mb-8 mr-6 bottom-0 right-0">
                <button
                    className="mr-2 p-0 w-14 h-14 bg-blue-highlight rounded-full hover:bg-blue-hover active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
                    onClick={clearUser}
                >
                    <img
                        className="w-9 h-9 inline-block"
                        src={Clear}
                        alt="Clear fields"
                    />
                </button>
                <button
                    className="p-0 w-14 h-14 bg-blue-highlight rounded-full hover:bg-blue-hover active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
                    onClick={addUser}
                >
                    <img
                        className="w-9 h-9 inline-block"
                        src={Add}
                        alt="Add person"
                    />
                </button>
            </div>
        </div>
    )
}
