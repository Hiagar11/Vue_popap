let num = 0;
export function MessageReceived() {
    num++
    console.log('MessageReceived')
    console.log('количество подтверждений '+ num)
}

export async function getJsonData() {
    let arr = [];
    await fetch('https://jsonplaceholder.typicode.com/users/1/posts')
        .then((response) => response.json())
        .then(json => json.forEach(j=> arr.push({id: j.id, title: j.title})))
    return arr
}
