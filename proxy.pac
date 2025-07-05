function FindProxyForURL(url, host) {
  if (dnsDomainIs(host, '.onion')) return 'SOCKS5 127.0.0.1:9050'
  if (host == 'playentry.org') return 'SOCKS5 121.169.46.116:1090'
  return 'DIRECT'
}
