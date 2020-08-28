import { flattenObj } from 'src/utils/objUtils'

it('flattenUntil', () => {
    const obj = {
        a: {
            b: 123,
            c: {
                d: '123'
            }
        }
    }
    // const r = flattenUntil(obj, x => x.d)
    const r = flattenObj(obj)

    console.log('r', r)
})
