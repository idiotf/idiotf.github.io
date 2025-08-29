function FindProxyForURL(url, host) {
  if (dnsDomainIs(host, '.onion')) return 'SOCKS5 127.0.0.1:9050'
  if (host == 'playentry.org') return 'SOCKS5 150.230.249.42:46818'
  return 'DIRECT'
}
