package keyencry

import (
	"crypto/rand"
	"encoding/base64"
	"strings"
)

func GenKey(size int, c bool) string {
	keySize := size
	key := make([]byte, keySize)
	rand.Read(key)
	base64Key := base64.StdEncoding.EncodeToString(key)
	if c {
		return strings.Replace(base64Key, "+", "*", -1)
	}
	return base64Key
}
