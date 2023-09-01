package keyencry

import (
	"crypto/rand"
	"encoding/base64"
	"strings"
)

func GenKey() string {
	keySize := 64
	key := make([]byte, keySize)
	rand.Read(key)
	base64Key := base64.StdEncoding.EncodeToString(key)
	return strings.Replace(base64Key, "+", "*", -1)
}
