addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const path = url.pathname

  // 提取文件名
  const image = path.substring(1)

  if (!image) {
    return new Response('No image specified.', { status: 400 })
  }

  const targetUrl = `https://www.javbus.com/pics/cover/${image}`

  const headers = new Headers({
    'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
    'Cache-Control': 'no-cache',
    'Cookie': 'existmag=mag; PHPSESSID=q456e1bkufv1cq4kbtshaji4d3',
    'Pragma': 'no-cache',
    'Priority': 'i',
    'Referer': 'https://www.javbus.com/',
    'Sec-Ch-Ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Microsoft Edge";v="126"',
    'Sec-Ch-Ua-Mobile': '?0',
    'Sec-Ch-Ua-Platform': '"macOS"',
    'Sec-Fetch-Dest': 'image',
    'Sec-Fetch-Mode': 'no-cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0'
  })

  const response = await fetch(targetUrl, {
    method: 'GET',
    headers: headers
  })

  if (!response.ok) {
    return new Response(`Error: ${response.statusText}`, { status: response.status })
  }

  const contentType = response.headers.get('Content-Type')
  return new Response(await response.arrayBuffer(), {
    headers: { 'Content-Type': contentType }
  })
}
