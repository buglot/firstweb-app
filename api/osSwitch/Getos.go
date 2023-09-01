package osswitch

import "strings"

func ChoiceSwitch(a string) string {
	var sd string
	switch a {
	case "Android":
	case "Ios":
		sd = "m"
		break
	default:
		sd = "web"
	}
	return sd
}

func GetOS(s string) string {
	for i := 0; i < 4; i++ {
		if strings.Contains(s, "Windows NT") {
			return "Windows"
		} else if strings.Contains(s, "Android") {
			return "Android"
		} else if strings.Contains(s, "iPhone OS") {
			return "Ios"
		} else {
			return "Linux"
		}
	}

	return "a"
}
